import { Link } from 'react-router-dom';
import { openCookieSettings } from '../../consent/consent';
import LegalPage from './LegalPage';

const CookiePolicy = () => (
  <LegalPage
    title="Cookie Policy"
    description="The cookies and similar technologies used on the NYC x DSSG website, and how to control them."
  >
    <p>
      This policy explains the cookies and similar technologies (such as local
      storage and pixels) used on this site. It supplements our{' '}
      <Link to="/privacy">Privacy Policy</Link>.
    </p>
    <p>
      <button type="button" className="legal-link-button" onClick={openCookieSettings}>
        Open cookie settings
      </button>
      {' '}to change your choices at any time. Withdrawing consent is as easy as
      giving it.
    </p>

    <h2>Categories</h2>
    <div className="legal-table-wrap">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Provider</th>
            <th>Purpose</th>
            <th>Consent needed?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Essential</td>
            <td>DSSG NYC</td>
            <td>
              Stores your cookie choice (<code>dssg_consent_v1</code>, local
              storage, until cleared).
            </td>
            <td>No</td>
          </tr>
          <tr>
            <td>Third-party embeds</td>
            <td>Luma (events calendar), Givebutter (donations)</td>
            <td>
              Display embedded content; providers may set cookies for session,
              fraud prevention, and functionality.
            </td>
            <td>No — shown with the page</td>
          </tr>
          <tr>
            <td>Forms and email</td>
            <td>Formspree, Kit (ConvertKit), Google Calendar scheduling</td>
            <td>
              Process forms you submit; they load only when you use them and may
              set functional cookies.
            </td>
            <td>Provider-controlled; see their policies</td>
          </tr>
          <tr>
            <td>Analytics</td>
            <td>Google Analytics (only if enabled)</td>
            <td>
              Measure traffic and site performance (e.g. <code>_ga</code>, up to
              2 years).
            </td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Advertising</td>
            <td>Google Ads (only if enabled)</td>
            <td>
              Conversion measurement and remarketing (e.g. <code>_gcl_*</code>,{' '}
              <code>IDE</code>, up to 13 months).
            </td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      We load Google Fonts from Google’s servers, which means your IP address is
      sent to Google when pages load. Fonts do not set advertising cookies.
    </p>

    <h2>Google Consent Mode v2</h2>
    <p>
      Google tags on this site start with all storage denied (
      <code>ad_storage</code>, <code>ad_user_data</code>,{' '}
      <code>ad_personalization</code>, <code>analytics_storage</code>) and are
      updated only after you choose. Learn more in Google’s{' '}
      <a
        href="https://policies.google.com/technologies/cookies"
        target="_blank"
        rel="noopener noreferrer"
      >
        cookie information
      </a>
      .
    </p>

    <h2>Other ways to control cookies</h2>
    <ul>
      <li>Use your browser settings to block or delete cookies.</li>
      <li>
        We honor the Global Privacy Control browser signal as an opt-out of
        advertising cookies.
      </li>
      <li>
        Manage Google ad personalization at{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          adssettings.google.com
        </a>
        , or opt out via the{' '}
        <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">
          DAA
        </a>
        {' / '}
        <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">
          EDAA
        </a>
        {' '}tools.
      </li>
    </ul>
  </LegalPage>
);

export default CookiePolicy;
