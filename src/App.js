import React from "react";
import './App.css';
import PosterBackground from "./images/RAW-poster.png";
import ticketButtonPng from "./images/TicketImage.png";

export default function RetroEventPage() {
  return (
    <div className="App">
      <div className="background-blur" />

      {/* Poster with button overlay */}
      <div className="poster-wrapper">
        <img
          src={PosterBackground}
          alt="Background Poster"
          className="poster-image"
        />

        {/* Ticket button relative to image */}
        <div className="ticket-button-overlay">
          <a
            href="https://www.paypal.com/ncp/payment/FY6F6Z34V2TKL"
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
    </div>
  );
}