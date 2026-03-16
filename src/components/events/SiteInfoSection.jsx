import { useState, useEffect } from "react";
import { useSiteInfo } from "../../hooks/useSiteInfo";
import { useProfile } from "../../hooks/useProfile";
import { supabase } from "../../lib/supabaseClient";

export function SiteInfoSection() {
  const siteInfo = useSiteInfo();
  const profile = useProfile();
  const isAdmin = profile?.role === "admin";

  const [localInfo, setLocalInfo] = useState(siteInfo);

  useEffect(() => {
    setLocalInfo(siteInfo);
  }, [siteInfo]);

  if (!localInfo) {
    return (
      <div className="site-info">
        <p style={{ opacity: 0.6 }}>Loading site info…</p>
      </div>
    );
  }

  const saveInfo = async () => {
    await supabase
      .from("site_info")
      .update({
        description: localInfo.description,
        contact: localInfo.contact,
      })
      .eq("id", localInfo.id);
  };

  return (
    <div className="site-info">
      <div className="site-info-column">
        <h3>About</h3>

        {isAdmin ? (
          <textarea
            value={localInfo.description}
            onChange={(e) =>
              setLocalInfo({ ...localInfo, description: e.target.value })
            }
          />
        ) : (
          <p>{localInfo.description}</p>
        )}
      </div>

      <div className="site-info-column">
        <h3>Contact</h3>

        {isAdmin ? (
          <textarea
            value={localInfo.contact}
            onChange={(e) =>
              setLocalInfo({ ...localInfo, contact: e.target.value })
            }
          />
        ) : (
          <pre>{localInfo.contact}</pre>
        )}
      </div>

      {isAdmin && (
        <button className="admin-save" onClick={saveInfo}>
          Save site info
        </button>
      )}
    </div>
  );
}