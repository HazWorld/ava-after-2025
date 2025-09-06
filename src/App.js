import React, { useState, useEffect } from "react";
import './App.css';
import PosterBackground from "./images/RAW-poster.png";
import ticketButtonPng from "./images/TicketImage.png";

export default function RetroEventPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [showError, setShowError] = useState(false);

  const correctPassword = "RAW2025"; // Change this as needed

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="App">
      {!authenticated && (
        <div className="password-overlay">
          <form onSubmit={handleSubmit} className="password-box">
            <h2>Enter Password</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Unlock</button>

            {/* 🔥 Error message if password is wrong */}
            {showError && (
              <div className="error-message">
                Incorrect password. Please try again.
              </div>
            )}
          </form>
        </div>
      )}

      {authenticated && (
        <>
          <div className="background-blur" />

          <div className="poster-wrapper">
            <img
              src={PosterBackground}
              alt="Background Poster"
              className="poster-image"
            />

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
        </>
      )}
    </div>
  );
}