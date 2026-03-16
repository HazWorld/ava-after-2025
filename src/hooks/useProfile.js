import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;

      supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single()
        .then(({ data }) => setProfile(data));
    });
  }, []);

  return profile;
}