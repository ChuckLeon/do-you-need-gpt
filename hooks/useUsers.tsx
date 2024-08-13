import { userStore } from "@/store/userStore";
import { createClient } from "@/utils/supabase/clients";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export const useUsers = () => {
  const t = useTranslations();
  const supabase = createClient();
  const { user, updateUserCredits } = userStore();

  const updateAiCredits = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("users")
        .update({ credits: user.credits - 1 })
        .eq("id", user.id)
        .select();

      if (error) {
        toast.error(t("general_error"));
      }

      if (data && data?.length > 0) {
        updateUserCredits(data[0].credits);
      }
    }
  };
  return { updateAiCredits };
};
