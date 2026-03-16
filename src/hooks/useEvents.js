import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setEvents(data || []));
  }, []);

  return events;
}