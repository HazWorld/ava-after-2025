import { useAuth } from "../hooks/useAuth";
import LoginOverlay from "../components/auth/LoginOverlay";
import EventsContent from "../components/events/EventsContent";
import { SiteInfoSection } from "../components/events/SiteInfoSection";

export default function RetroEventPage() {
  const { authenticated, login, signup, logout } = useAuth();

  if (!authenticated) {
    return <LoginOverlay onLogin={login} onSignup={signup} />;
  }

  return (
    <>
      <div/>

      <div style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
        <button className="secondary-btn" onClick={logout}>
          Log out
        </button>
      </div>

      <EventsContent />
      <SiteInfoSection />
    </>
  );
}