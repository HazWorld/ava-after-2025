import { useState, useEffect } from "react";
import { useEvents } from "../../hooks/useEvents";
import { useProfile } from "../../hooks/useProfile";
import { supabase } from "../../lib/supabaseClient";

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
      })
      .eq("id", event.id);

    if (error) {
      console.error(error);
      alert("Failed to save event");
    }
  };

  const uploadEventImage = async (eventId, file) => {
    const ext = file.name.split(".").pop();
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
  
    await supabase
      .from("events")
      .update({ image_url: data.publicUrl })
      .eq("id", eventId);
  };

  return (
    <div className="events-wrapper">
      <h1>Events</h1>
  
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
              {/* IMAGE PREVIEW */}
              {event.image_url && (
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="event-image"
                />
              )}
  
              {/* IMAGE UPLOAD */}
              <input
                type="file"
                accept="image/*"
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
                type = "date"
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
              {event.image_url && (
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="event-image"
                />
              )}
  
              <h2>{event.title}</h2>
              <p>{event.date} — {event.location}</p>
              <p>{event.description}</p>
              <a
      href={event.ticket_link || "https://www.paypal.com/ncp/payment/SZ8FH6RMXP6PY"}
      target="_blank"
      rel="noopener noreferrer"
      className="buy-ticket-btn"
    >
      Buy Ticket
    </a>
            </>
          )}
        </div>
      ))}
    </div>
  );


}