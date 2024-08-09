import { IUser, userStore } from "@/store/userStore";
import { createClient } from "@/utils/supabase/clients";
import { useEffect } from "react";

export const supabase = createClient();

export const useAuth = () => {
  const { user, setUser } = userStore();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        let { data: users, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.user?.id)
          .limit(1);

        if (users) {
          const formatedUser: IUser = {
            id: users[0].id,
            email: users[0].email,
            credits: users[0].credits,
          };

          setUser(formatedUser);
        }
      }
    };

    if (!user) {
      getUser();
    }
  }, [setUser, user]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { supabase, signOut };
};
