import React from 'react';
import './Events.css';
import Seo from './Seo';

const LUMA_EMBED_URL = 'https://luma.com/embed/calendar/cal-4VqcQEpR4zqBF8Q/events';
const LUMA_CALENDAR_URL = 'https://luma.com/calendar/cal-4VqcQEpR4zqBF8Q';

const Events = () => {
  return (
    <>
      <Seo
        title="Events - DSSG NYC"
        description="Join our upcoming Data Science for Social Good events in New York City. Connect with like-minded professionals and make a difference through technology."
        type="website"
        name="DSSG NYC Events"
      />

      <div className="events-container">
        <div className="events-hero">
          <h1>Upcoming Events</h1>
          <p>Join our community of data scientists and social good enthusiasts</p>
        </div>

        <div className="events-content">
          <div className="events-embed-section">
            <iframe
              src={LUMA_EMBED_URL}
              className="luma-embed"
              frameBorder="0"
              allowFullScreen
              aria-hidden="false"
              tabIndex="0"
              title="DSSG NYC Events Calendar"
            />
          </div>

          <div className="events-info-large">
            <div className="events-info-content">
              <h2>About Our Events</h2>
              <p>
                DSSG NYC hosts regular meetups, workshops, and networking events focused on
                using data science and AI for social good. Our events bring together professionals,
                students, and non-profit organizations to collaborate on meaningful projects.
              </p>

              <div className="event-details">
                <h3>What to Expect:</h3>
                <ul>
                  <li>Networking with like-minded professionals</li>
                  <li>Technical workshops and presentations</li>
                  <li>Project collaboration opportunities</li>
                  <li>Guest speakers from non-profit organizations</li>
                  <li>Light refreshments and snacks</li>
                </ul>
              </div>

              <div className="events-button-container">
                <a
                  href={LUMA_CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="events-button"
                >
                  View All Events on LUMA
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
