import Seo from './Seo';
import ImpactCarousel from './carousel/ImpactCarousel';

const Portfolio = () => (
  <>
    <Seo
      title="Our Portfolio - NYC x DSSG"
      description="Open source civic tech built by NYC x DSSG volunteers — FOIA Fluent, Unredacted Monitor, GrantPilot AI, and the NYC Land Use & ZAP Tracker."
      type="website"
      name="Our Portfolio"
    />
    <ImpactCarousel />
  </>
);

export default Portfolio;
