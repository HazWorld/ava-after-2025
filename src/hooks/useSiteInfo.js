import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useSiteInfo() {
  const [siteInfo, setSiteInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const { data, error } = await supabase
        .from("site_info")
        .select("*")
        .limit(1)
        .single();

      if (!error) setSiteInfo(data);
    };

    fetchInfo();
  }, []);

  return siteInfo;
}