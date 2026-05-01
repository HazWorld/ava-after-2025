import { useState } from "react";
import SignupModal from "./SignupModal";
import passwordImage from "../../images/RAW-new.png";
import { supabase } from "../../lib/supabaseClient";

export default function LoginOverlay({ onLogin, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [signupOpen, setSignupOpen] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    const { error } = await onLogin(email.trim(), password);
    if (error) setError("Incorrect email or password.");
  };

  const handleCodeLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase
      .from("access_codes")
      .select("*")
      .eq("code", accessCode.trim())
      .eq("active", true)
      .single();

    if (error || !data) {
      setError("Invalid access code.");
      return;
    }

    const { error: authError } = await supabase.auth.signInAnonymously();
    if (authError) {
      console.error(authError);
      setError("Failed to log in with code.");
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="password-overlay">
      <div className="password-box">
        <img src={passwordImage} alt="RAW Logo" className="password-logo" />

        <div className="auth-panels">
          {/* ACCESS CODE PANEL */}
          <div className="auth-panel">
            <div className="auth-panel-label">Enter with code</div>
            <form onSubmit={handleCodeLogin}>
              <input
                type="text"
                placeholder="Access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
              />
              <button type="submit">Enter</button>
            </form>
          </div>

          <div className="auth-divider"><span>or</span></div>

          {/* ACCOUNT PANEL */}
          <div className="auth-panel">
            <div className="auth-panel-label">Account</div>
            <form onSubmit={handleEmailLogin}>
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
              <button type="submit">Log in</button>
            </form>
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setSignupOpen(true)}
            >
              Sign up
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      <SignupModal
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSignup={onSignup}
      />
    </div>
  );
}
