import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(!!data.session);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, session) => setAuthenticated(!!session)
    );

    return () => sub.subscription.unsubscribe();
  }, []);

  const login = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signup = (email, password) =>
    supabase.auth.signUp({ email, password });

  const logout = () => supabase.auth.signOut();

  return { authenticated, login, signup, logout };
}