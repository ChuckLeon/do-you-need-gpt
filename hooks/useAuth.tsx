import { createClient } from "@/utils/supabase/clients";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const supabase = createClient();

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { supabase, user, signOut };
};
