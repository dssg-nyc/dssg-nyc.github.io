import { Link } from 'react-router-dom';
import siteProperties from '../../data/siteproperties.json';
import { openCookieSettings } from '../../consent/consent';
import LegalPage from './LegalPage';

const PrivacyPolicy = () => {
  const email = siteProperties.privacyEmail;
  const { legalName, address } = siteProperties;

  return (
    <LegalPage
      title="Privacy Policy"
      description="How NYC x DSSG (Data Diplomats for Nonprofits, Inc.) collects, uses, and protects personal information, and the rights you have under GDPR and U.S. state privacy laws."
    >
      <p>
        This policy explains how {legalName} (“DSSG NYC,” “we,” “us”), a 501(c)(3)
        nonprofit at {address}, handles personal information collected through this
        website. See also our <Link to="/cookies">Cookie Policy</Link> and{' '}
        <Link to="/ai-policy">AI Policy</Link>.
      </p>

      <h2>1. Who is responsible</h2>
      <p>
        {legalName} is the “controller” (GDPR) and “business” or equivalent
        (U.S. state laws) for the data described here. Contact us at{' '}
        <a href={`mailto:${email}`}>{email}</a> or by mail at the address above.
      </p>

      <h2>2. Information we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li>
          <strong>Contact form</strong> (processed by Formspree): your email
          address and the project description you write.
        </li>
        <li>
          <strong>Email subscription</strong> (processed by Kit, formerly
          ConvertKit): name and email address.
        </li>
        <li>
          <strong>Event registration</strong> (Luma) and <strong>donations</strong>{' '}
          (Givebutter): collected directly by those providers under their own
          policies; we receive the details needed to run events and acknowledge
          gifts. We never see full payment card numbers.
        </li>
        <li>
          <strong>Appointment booking</strong> (Google Calendar appointment
          scheduling): name, email, and anything you add to the booking.
        </li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          Technical data such as IP address, browser type, device, and pages
          requested, which our hosting provider (GitHub Pages) and the third
          parties listed below receive when your browser connects to them.
        </li>
        <li>
          Your cookie choices, stored in your browser’s local storage (see the
          Cookie Policy).
        </li>
        <li>
          If analytics or advertising are enabled and you consent: usage data
          and online identifiers collected by Google (see section 5).
        </li>
      </ul>
      <p>
        We do not intentionally collect sensitive personal information (such as
        health, precise location, or government ID numbers) and ask that you do
        not include it in forms.
      </p>

      <h2>3. How we use information and our legal bases (GDPR)</h2>
      <div className="legal-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Legal basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Responding to inquiries and project requests</td>
              <td>Legitimate interests; steps at your request before a contract</td>
            </tr>
            <tr>
              <td>Sending newsletters and event updates</td>
              <td>Consent (withdraw anytime via the unsubscribe link)</td>
            </tr>
            <tr>
              <td>Running events and volunteer programs</td>
              <td>Legitimate interests; contract</td>
            </tr>
            <tr>
              <td>Processing and acknowledging donations; tax records</td>
              <td>Contract; legal obligation</td>
            </tr>
            <tr>
              <td>Third-party embeds, analytics, and advertising cookies</td>
              <td>Consent</td>
            </tr>
            <tr>
              <td>Site security and preventing abuse</td>
              <td>Legitimate interests</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        We do not sell personal information for money, and we do not use it for
        automated decisions with legal effects.
      </p>

      <h2>4. Who we share information with</h2>
      <p>
        We share information only with service providers acting for us, or
        independent platforms you choose to use:
      </p>
      <ul>
        <li>
          Formspree (contact form), Kit/ConvertKit (email), Luma (events),
          Givebutter (donations), Google (calendar booking, fonts, and
          analytics/advertising if enabled), Substack (if you follow our
          newsletter link), GitHub (hosting and code).
        </li>
        <li>
          Professional advisers, and authorities where required by law or to
          protect rights and safety.
        </li>
      </ul>
      <p>
        If we ever run Google Ads, we may share limited data with Google only
        after your consent. Google’s use of data is described at{' '}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          How Google uses information from sites or apps that use its services
        </a>
        .
      </p>

      <h2>5. Cookies, analytics, and advertising</h2>
      <p>
        Event and donation embeds are shown on the page. We load analytics and
        advertising cookies only with your consent and honor the Global Privacy Control signal by keeping
        advertising off. Under Google Consent Mode v2, Google tags receive
        “denied” signals for <code>ad_storage</code>, <code>ad_user_data</code>,{' '}
        <code>ad_personalization</code>, and <code>analytics_storage</code> until
        you opt in. If we use Google Ads remarketing or conversion measurement,
        third-party vendors including Google may show our ads on other sites
        based on prior visits, and you can manage this at{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        . We do not target ads using sensitive categories. Details are in our{' '}
        <Link to="/cookies">Cookie Policy</Link>.{' '}
        <button type="button" className="legal-link-button" onClick={openCookieSettings}>
          Change your cookie settings
        </button>
      </p>

      <h2>6. International transfers</h2>
      <p>
        We are based in the United States, and our providers process data there
        and elsewhere. If you are in the EEA, UK, or Switzerland, we rely on
        safeguards such as the EU-U.S. Data Privacy Framework (where the
        recipient is certified) or Standard Contractual Clauses. Contact us for
        a copy of the relevant safeguards.
      </p>

      <h2>7. Retention</h2>
      <ul>
        <li>Contact inquiries: up to 24 months after the last communication.</li>
        <li>Email subscriptions: until you unsubscribe, then only a suppression record.</li>
        <li>Donation and tax records: as required by law (generally 7 years).</li>
        <li>Cookie preference record: until you clear it or it is replaced.</li>
      </ul>

      <h2>8. Your rights</h2>
      <h3>EEA, UK, and Switzerland (GDPR)</h3>
      <p>
        You may request access, correction, deletion, restriction, portability,
        and object to processing based on legitimate interests, and you may
        withdraw consent at any time without affecting prior processing. You may
        complain to your local data protection authority.
      </p>
      <h3>California and other U.S. states</h3>
      <p>
        Residents of states with privacy laws (including California, Virginia,
        Colorado, Connecticut, Texas, and others) may have the right to know,
        access, correct, delete, and obtain a copy of their data, and to opt out
        of sale, sharing for cross-context behavioral advertising, and targeted
        advertising. As a nonprofit we may fall outside some of these laws, but
        we honor these requests voluntarily. We do not sell personal
        information, and we treat the Global Privacy Control signal as an
        opt-out of sharing and targeted advertising. We will not discriminate
        against you for exercising your rights. California “Shine the Light”
        requests may also be sent to us.
      </p>
      <p>
        To exercise any right, email <a href={`mailto:${email}`}>{email}</a>. We
        may need to verify your identity and will respond within 30 days (45 for
        U.S. state requests, extendable once). You may appeal a refusal by
        replying to our response.
      </p>

      <h2>9. Children</h2>
      <p>
        This site is not directed to children under 16, and we do not knowingly
        collect their information. If you believe a child has given us data,
        contact us and we will delete it.
      </p>

      <h2>10. Security</h2>
      <p>
        We use HTTPS and limit access to personal information to people and
        vendors who need it. No system is completely secure, so we cannot
        guarantee absolute security.
      </p>

      <h2>11. Changes</h2>
      <p>
        We will post updates here with a new effective date and, where required,
        ask for your consent again.
      </p>

      <h2>12. Contact</h2>
      <p>
        {legalName}, {address}. <a href={`mailto:${email}`}>{email}</a>
      </p>
    </LegalPage>
  );
};

export default PrivacyPolicy;
