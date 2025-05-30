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
            Hey folks – just a heads-up!  Tomorrow’s event is now fully sold out. 
            If you don’t have a ticket or aren’t on the artist/crew/AAA list, you won’t be able to get in.

            </p>
            <p>
            Please don’t turn up hoping to grab a last-minute spot or chance it at the door – we’re at 
            full capacity and need to respect the safety and comfort of everyone attending.
 
            </p>
            <p>
            Appreciate your understanding – see you at the next one!
            </p>
        
            <p className="buy-pass-button mt-8 disabled">
             Tickets Sold Out
          </p>
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
