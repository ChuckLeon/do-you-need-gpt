import { searchStore } from "@/store/searchStore";
import { IUser, userStore } from "@/store/userStore";
import { createClient } from "@/utilities/supabase/clients";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export const useAuth = () => {
  const supabase = createClient();
  const t = useTranslations();
  const { setUser } = userStore();
  const { setSearches } = searchStore();

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      let { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user?.id)
        .limit(1);

      if (error) {
        toast.error(t("general_error"));
        return;
      }

      if (users && users?.length > 0) {
        const formatedUser: IUser = {
          id: users[0].id,
          email: users[0].email,
          credits: users[0].credits,
        };

        setUser(formatedUser);
      }
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSearches([]);
  };

  return { supabase, signOut, getUser };
};
