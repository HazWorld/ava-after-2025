import React from "react";
import './App.css';
import PosterBackground from "./images/RAW-tickets.svg";
import ticketButtonPng from "./images/TicketImage.png";

export default function RetroEventPage() {
  return (
    <div className="App">
      <div className="poster-wrapper">
        <img
          src={PosterBackground}
          alt="Background Poster"
          className="background-svg"
        />

        {/* Glitchable Ticket Button */}
        <a
          href="https://your-ticket-link.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ticket-button"
        >
          <div className="ticket-button-glitch">
            <img src={ticketButtonPng} alt="Buy Tickets" />
          </div>
        </a>
      </div>
    </div>
  );
}