import React from "react";
import { motion } from "framer-motion";
import './App.css';
// import ayePng from './images/ayeland_logo_white.png';
import rawPng from './images/raw-logo-white.png';
import warePng from './images/bridge_wireframe.png';

export default function RetroEventPage() {
  return (
    <div className="App">
      <div className="App-header">
        {/* Title with RAW logo beside it */}
        <div className="title-container">
          <motion.h1
            className="typing-effect title-text mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <span className="title-main">AVA After</span>
            <span className="title-subtext">2025</span>
          </motion.h1>
          <img
            src={rawPng}
            alt="RAW Logo"
            className="title-logo"
          />
        </div>

        {/* Grouped content: Artists and Event Details */}
        <div className="info-container">
          <div className="artists">
            {/* <p className="typing-effect text-lg mb-6">- 11 - Late -</p> */}
            <p className="typing-effect date-line">/ Saturday 31st May /</p>
            
            <p></p>
            <p className="typing-effect text-lg mb-6">...Matheson & Preference... //</p>
            <p className="typing-effect text-lg mb-6">...Uncle Moe... //</p>
            <p className="typing-effect text-lg mb-6">...Optmst... //</p>
            <p className="typing-effect text-lg mb-6">...Hannah... //</p>
            <p className="typing-effect text-lg mb-6">...TBA... //</p>
          </div>

          <motion.div
            className="event-details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <h2 className="text-2xl mb-2">Event Details</h2>
            <p>Undisclosed Location</p>
            <p>11 - 5</p>
            <p>
              last entry 1 AM
            </p>
            <p>
              Back again this year for the after, limiting tickets to 150 on this to manage numbers so 
              if interested in coming please get your tickets ahead of event. We’re aiming to close doors at 1am 
              for this if you can get there for then to be sure of entry.
            </p>
            <p>
              We’ll release location info on the Friday for those that don’t already know. 
            </p>
            <p>
              Ticketholders are able to drop any alcohol at the venue on week of event. Email{' '}
              <span className="email-highlight">info@r-a-w.club</span> to organise.
            </p>
            <p>
              We’ll be closing up at 5-6 am if you could please arrange travel or plans 
              from then and disperse from area.</p>
            <p>
              In the case of the event selling out ahead we want to control numbers this 
              year may ask for discretion in this scenario as word of mouth can get out 
              of control and we are a small space trying to go under the radar.


            </p>
            <p>

            </p>
            <span className="buy-pass-button mt-4 disabled">
             Tickets Sold Out
          </span>
          </motion.div>
        </div>

        {/* Flashing background image */}
        <motion.img
          src={warePng}
          alt="retro background"
          className="background-image"
          animate={{ opacity: [0.5] }}
        />
      </div>

      {/* Footer image */}
      <footer className="App-footer">
        {/* <img
          src={ayePng}
          alt="Retro Footer"
          className="footer-image"
        /> */}
      </footer> 
    </div>
  );
}
