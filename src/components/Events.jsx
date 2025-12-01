import React, { useEffect } from 'react';
import './Events.css';
import Seo from './Seo';

const Events = () => {
  useEffect(() => {
    // Load Eventbrite widget script
    const script = document.createElement('script');
    script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize the widget when component mounts
    const initializeWidget = () => {
      if (window.EBWidgets) {
        const exampleCallback = function() {
          console.log('Order complete!');
        };

        window.EBWidgets.createWidget({
          widgetType: 'checkout',
          eventId: '1671837644399',
          modal: true,
          modalTriggerElementId: 'eventbrite-widget-modal-trigger-1671837644399',
          onOrderComplete: exampleCallback
        });
      }
    };

    // Wait for the script to load
    script.onload = initializeWidget;

    return () => {
      // Clean up
      document.body.removeChild(script);
    };
  }, []);

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
          {/* Large events info box */}
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
                  href="https://www.eventbrite.com/o/nyc-data-science-for-social-good-dssg-nyc-115798799901#events" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="events-button"
                >
                  See Events
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
