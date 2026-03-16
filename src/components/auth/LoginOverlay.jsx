import { useState } from "react";
import SignupModal from "./SignupModal";
import passwordImage from "../../images/RAW-new.png";

export default function LoginOverlay({ onLogin, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(false);
    const { error } = await onLogin(email.trim(), password);
    if (error) setError(true);
  };

  return (
    <div className="password-overlay">
      <form onSubmit={submit} className="password-box">
        <img src={passwordImage} alt="RAW Logo" className="password-logo" />

        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Unlock</button>

        <button
          type="button"
          className="secondary-btn"
          onClick={() => setSignupOpen(true)}
        >
          Sign up
        </button>

        {error && (
          <div className="error-message">
            Incorrect email or password.
          </div>
        )}
      </form>

      <SignupModal
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSignup={onSignup}
      />
    </div>
  );
}