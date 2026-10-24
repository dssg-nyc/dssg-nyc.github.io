export const CONSENT_KEY = 'dssg_consent_v1';
export const CONSENT_CHANGE_EVENT = 'dssg-consent-change';
export const OPEN_CONSENT_EVENT = 'dssg-open-consent-settings';

const GOOGLE_TAG_ID = import.meta.env.VITE_GOOGLE_TAG_ID;

export const defaultPreferences = () => ({
  embeds: true,
  analytics: true,
  advertising: true,
});

const deniedPreferences = () => ({
  embeds: false,
  analytics: false,
  advertising: false,
});

export const hasGlobalPrivacyControl = () => (
  typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true
);

const applyGpc = (preferences) => ({
  ...defaultPreferences(),
  ...preferences,
  advertising: preferences?.advertising === true && !hasGlobalPrivacyControl(),
});

export const readConsent = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_KEY));
    if (stored && typeof stored === 'object') {
      return applyGpc(stored);
    }
  } catch {
    // Ignore unreadable or legacy values and treat as no choice yet.
  }
  return null;
};

const pushDataLayer = (...args) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
};

export const toConsentMode = (preferences) => {
  const flag = (granted) => (granted ? 'granted' : 'denied');
  return {
    ad_storage: flag(preferences.advertising),
    ad_user_data: flag(preferences.advertising),
    ad_personalization: flag(preferences.advertising),
    analytics_storage: flag(preferences.analytics),
    functionality_storage: flag(preferences.embeds),
    personalization_storage: flag(preferences.advertising),
    security_storage: 'granted',
  };
};

const loadGoogleTag = () => {
  if (!GOOGLE_TAG_ID || document.getElementById('google-tag-script')) {
    return;
  }

  const script = document.createElement('script');
  script.id = 'google-tag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_TAG_ID)}`;
  document.head.appendChild(script);
  pushDataLayer('js', new Date());
  pushDataLayer('config', GOOGLE_TAG_ID);
};

const applyConsentMode = (preferences) => {
  pushDataLayer('consent', 'update', toConsentMode(preferences));
  if (preferences.analytics || preferences.advertising) {
    loadGoogleTag();
  }
};

export const initConsent = () => {
  pushDataLayer('consent', 'default', {
    ...toConsentMode(deniedPreferences()),
    wait_for_update: 500,
  });
  const stored = readConsent();
  if (stored) {
    applyConsentMode(stored);
  }
};

export const saveConsent = (partial) => {
  const preferences = applyGpc({ ...defaultPreferences(), ...partial });
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      ...preferences,
      savedAt: new Date().toISOString(),
    }));
  } catch {
    // Private mode can block localStorage; still apply the in-memory choice.
  }
  applyConsentMode(preferences);
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: preferences }));
  return preferences;
};

export const subscribeConsent = (listener) => {
  const handler = () => listener(readConsent());
  window.addEventListener(CONSENT_CHANGE_EVENT, handler);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handler);
};

export const openCookieSettings = () => {
  window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT));
};
