import { Link } from 'react-router-dom';
import siteProperties from '../../data/siteproperties.json';
import LegalPage from './LegalPage';

const AiPolicy = () => {
  const { legalName, privacyEmail } = siteProperties;

  return (
    <LegalPage
      title="AI Policy"
      description="How NYC x DSSG uses, builds, and teaches AI responsibly, including transparency, human oversight, and data protection."
    >
      <p>
        {legalName} trains volunteers to bring human-centered AI to
        mission-driven organizations. This policy describes the principles we
        follow. It applies to our website, our volunteer and consulting work,
        and AI tools we offer to nonprofits.
      </p>

      <h2>1. Principles</h2>
      <ul>
        <li>
          <strong>Human oversight:</strong> people review and are accountable
          for AI-assisted work before it is shared or acted on. AI does not make
          decisions that significantly affect individuals.
        </li>
        <li>
          <strong>Transparency:</strong> we disclose when content or analysis
          was substantially generated or assisted by AI, and tell you when you
          are interacting with an AI system.
        </li>
        <li>
          <strong>Fairness:</strong> we watch for bias and avoid uses that
          discriminate or exploit.
        </li>
        <li>
          <strong>Privacy and security:</strong> we minimize personal data used
          with AI (see below).
        </li>
        <li>
          <strong>Accuracy:</strong> AI can be wrong. We verify facts, figures,
          citations, and code.
        </li>
      </ul>

      <h2>2. How we use AI</h2>
      <ul>
        <li>
          Drafting and editing (for example grant, donor, and communications
          material) with human review.
        </li>
        <li>
          Data analysis, dashboards, and software built with AI coding
          assistants, reviewed and tested by volunteers.
        </li>
        <li>
          Training programs and bootcamps on tools such as Claude Code and
          agentic AI.
        </li>
        <li>
          In-house AI tools offered to nonprofits (see our{' '}
          <Link to="/portfolio">portfolio</Link>).
        </li>
      </ul>
      <p>
        This website does not currently use AI to profile visitors, and your
        contact form or email submissions are not used to train AI models.
      </p>

      <h2>3. Data and AI</h2>
      <ul>
        <li>
          We do not enter sensitive personal information about clients,
          beneficiaries, donors, or volunteers into AI tools without a
          documented need, agreement, and appropriate safeguards.
        </li>
        <li>
          We choose AI providers whose terms prohibit training on our inputs or
          whose settings allow us to disable it, and we use enterprise or API
          terms where available.
        </li>
        <li>
          Data shared with AI providers is handled under our{' '}
          <Link to="/privacy">Privacy Policy</Link>, and we apply data
          minimization, anonymization, or aggregation where practical.
        </li>
      </ul>

      <h2>4. Prohibited uses</h2>
      <p>
        We do not use AI for deceptive impersonation, deepfakes of real people,
        surveillance or biometric identification of individuals, producing
        disinformation, or any unlawful purpose, and we ask nonprofits we assist
        to follow the same standard.
      </p>

      <h2>5. Intellectual property and attribution</h2>
      <p>
        We respect third-party rights and verify AI output for plagiarism and
        licensing issues where relevant. Open-source work we publish is governed
        by its repository license.
      </p>

      <h2>6. Legal and regulatory alignment</h2>
      <p>
        We aim to follow applicable laws including GDPR (including the rules on
        automated decision-making), the EU AI Act where it applies to our
        activities, and U.S. federal and state laws on privacy, consumer
        protection, and discrimination. For guidance we draw on the NIST AI Risk
        Management Framework.
      </p>

      <h2>7. Your choices and feedback</h2>
      <p>
        You may ask whether AI was used in work we delivered, request human
        review of an AI-assisted outcome, or report a concern or error. Contact{' '}
        <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>. We review this
        policy as the technology and the law evolve.
      </p>
    </LegalPage>
  );
};

export default AiPolicy;
