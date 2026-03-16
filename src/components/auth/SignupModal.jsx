import { useEffect, useState } from "react";

export default function SignupModal({ open, onClose, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setEmail("");
      setPassword("");
      setConfirm("");
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) return setError("Password too short.");
    if (password !== confirm) return setError("Passwords do not match.");

    const { error } = await onSignup(email.trim(), password);
    if (error) return setError(error.message);

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div className="modal-title">Sign up</div>
          <button onClick={onClose}>✕</button>
        </div>

        <form onSubmit={submit} className="modal-body">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="modal-primary">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}