import { useState, useEffect } from "react";
import { useEvents } from "../../hooks/useEvents";
import { useProfile } from "../../hooks/useProfile";
import { supabase } from "../../lib/supabaseClient";
import ticketImage from "../../images/TicketImage.png";

export default function EventsContent() {
  console.log("EventsContent rendered");

  const events = useEvents();
  const profile = useProfile();
  const isAdmin = profile?.role === "admin";

  // Local state for editable events
  const [editableEvents, setEditableEvents] = useState([]);

  // Sync fetched events into local state
  useEffect(() => {
    setEditableEvents(events);
  }, [events]);

  const addEvent = async () => {
    const today = new Date().toISOString().split("T")[0];
  
    const { data, error } = await supabase
      .from("events")
      .insert({
        title: "EVENT TITLE",
        date: today,
        location: "LOCATION",
        description: "DESCRIPTION",
      })
      .select();
  
    if (!error && data?.length > 0) {
      setEditableEvents((prev) => [...prev, data[0]]);
    }
  };

  const deleteEvent = async (id) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) {
      setEditableEvents(prev => prev.filter(event => event.id !== id));
    }
  };

  // Update local state while typing
  const updateLocalEvent = (id, field, value) => {
    setEditableEvents(prev =>
      prev.map(event =>
        event.id === id ? { ...event, [field]: value } : event
      )
    );
  };

  // Save changes to Supabase
  const saveEvent = async (event) => {
    const { error } = await supabase
      .from("events")
      .update({
        title: event.title,
        date: event.date,
        location: event.location,
        description: event.description,
        ticket_link: event.ticket_link,
      })
      .eq("id", event.id);

    if (error) {
      console.error(error);
      alert("Failed to save event");
    }
  };

  const isVideo = (url) => url?.toLowerCase().endsWith(".mp4");

  const uploadEventImage = async (eventId, file) => {
    const ext = file.name.split(".").pop().toLowerCase();
    const allowed = ["jpg", "jpeg", "png", "gif", "webp", "mp4"];
    if (!allowed.includes(ext)) {
      alert("Only JPG, PNG, GIF, WebP, and MP4 files are allowed");
      return;
    }

    const fileName = `${eventId}.${ext}`;

    const { error } = await supabase.storage
      .from("event-images")
      .upload(fileName, file, { upsert: true });

    if (error) {
      alert("Upload failed");
      return;
    }

    const { data } = supabase.storage
      .from("event-images")
      .getPublicUrl(fileName);

    const { error: updateError } = await supabase
      .from("events")
      .update({ image_url: data.publicUrl })
      .eq("id", eventId);

    if (!updateError) {
      setEditableEvents(prev =>
        prev.map(ev =>
          ev.id === eventId ? { ...ev, image_url: data.publicUrl } : ev
        )
      );
    }
  };

  return (
    <div className="events-wrapper">
      {isAdmin && <h1>Events</h1>}
  
      {isAdmin && (
        <button onClick={addEvent} className="admin-btn">
          + Add Event
        </button>
      )}
  
  {[...editableEvents]
  .sort((a, b) => new Date(a.date) - new Date(b.date)) // oldest first
  .map((event) => (
        <div className="event-card" key={event.id}>
          {isAdmin ? (
            <>
              {/* IMAGE/VIDEO PREVIEW WITH TICKET OVERLAY */}
              {event.image_url && (
                <div className="event-image-container">
                  {isVideo(event.image_url) ? (
                    <video
                      src={event.image_url}
                      className="event-image"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="event-image"
                    />
                  )}
                  {event.ticket_link && (
                    <a
                      href={event.ticket_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ticket-overlay"
                    >
                      <img src={ticketImage} alt="Buy Tickets" className="ticket-overlay-img" />
                    </a>
                  )}
                </div>
              )}

              {/* IMAGE UPLOAD */}
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,.mp4"
                onChange={(e) => {
                  if (!e.target.files?.[0]) return;
                  uploadEventImage(event.id, e.target.files[0]);
                }}
              />

              <input
                className="admin-input"
                value={event.title}
                onChange={(e) =>
                  updateLocalEvent(event.id, "title", e.target.value)
                }
              />

              <input
                type="date"
                className="admin-input"
                value={event.date}
                onChange={(e) =>
                  updateLocalEvent(event.id, "date", e.target.value)
                }
              />

              <input
                className="admin-input"
                value={event.location}
                onChange={(e) =>
                  updateLocalEvent(event.id, "location", e.target.value)
                }
              />

              <textarea
                className="admin-textarea"
                value={event.description}
                onChange={(e) =>
                  updateLocalEvent(event.id, "description", e.target.value)
                }
              />

              <input
                className="admin-input"
                placeholder="Ticket link (PayPal URL)"
                value={event.ticket_link || ""}
                onChange={(e) =>
                  updateLocalEvent(event.id, "ticket_link", e.target.value)
                }
              />

              <div className="admin-actions">
                <button
                  className="admin-save"
                  onClick={() => saveEvent(event)}
                >
                  Save
                </button>

                <button
                  className="admin-delete"
                  onClick={() => deleteEvent(event.id)}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              {/* PUBLIC VIEW */}
              <div className="event-image-container">
                {event.image_url && (
                  isVideo(event.image_url) ? (
                    <video
                      src={event.image_url}
                      className="event-image"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="event-image"
                    />
                  )
                )}
                {event.ticket_link && (
                  <a
                    href={event.ticket_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ticket-overlay"
                  >
                    <img src={ticketImage} alt="Buy Tickets" className="ticket-overlay-img" />
                  </a>
                )}
              </div>

              {/* Event info hidden from public view for now */}
            </>
          )}
        </div>
      ))}
    </div>
  );


}