import React, { useState } from "react";
import "./App.css";
import PosterBackground from "./images/raw-oct-flyer.webp";
import ticketButtonPng from "./images/raw-oct-ticket-only.webp";
import passwordImage from "./images/RAW-new.png";

export default function RetroEventPage() {
  const correctPassword = "WIP";
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [showError, setShowError] = useState(false);

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
            <img src={passwordImage} alt="RAW Logo" className="password-logo" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Unlock</button>
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
            <div className="poster-image-container">
              {/* Base poster image */}
              <img
                src={PosterBackground}
                alt="Event Poster"
                className="poster-image"
              />

              {/* Overlay ticket (same dimensions) with glitch */}
              <a
                href="https://www.paypal.com/ncp/payment/685EX6N7WCHTU"
                target="_blank"
                rel="noopener noreferrer"
                className="ticket-overlay-link"
                style={{ "--ticket-img": `url(${ticketButtonPng})` }}
                aria-label="Buy tickets"
              >
                <div className="ticket-glitch">
                  <img
                    src={ticketButtonPng}
                    alt=""
                    className="ticket-overlay-image"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}