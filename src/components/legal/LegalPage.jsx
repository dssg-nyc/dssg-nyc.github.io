import PropTypes from 'prop-types';
import Seo from '../Seo';
import PageIntro from '../PageIntro';
import './LegalPage.css';

const LEGAL_EFFECTIVE_DATE = 'October 18, 2026';

const LegalPage = ({ title, description, children }) => (
  <div className="legal-page">
    <Seo
      title={`${title} - NYC x DSSG`}
      description={description}
      type="website"
      name={title}
    />
    <PageIntro eyebrow="Legal" title={title}>
      Last updated on {LEGAL_EFFECTIVE_DATE}
    </PageIntro>
    <section className="legal-body">
      <article className="legal-article paper-card">
        {children}
      </article>
    </section>
  </div>
);

LegalPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LegalPage;
