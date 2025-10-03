import React, { useState } from "react";
import './App.css';
import PosterBackground from "./images/RAW-poster-new.png";
import ticketButtonPng from "./images/TicketImage.png";
import passwordImage from "./images/RAW-new.png"

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

            <img
              src={passwordImage}
              alt="RAW Logo"
              className="password-logo"
            />

            {/* <h2>Enter Password</h2> */}
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
              <img
                src={PosterBackground}
                alt="Background Poster"
                className="poster-image"
              />

              <div className="ticket-button-overlay">
                <a
                  // href="https://www.paypal.com/ncp/payment/FY6F6Z34V2TKL"
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
        </>
      )}
    </div>
  );
}