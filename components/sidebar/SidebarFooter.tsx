import { userStore } from "@/store/userStore";
// import LoginBtn from "../loginBtn/LoginBtn";
import { useTranslations } from "next-intl";

export const SidebarFooter = () => {
  const t = useTranslations();
  const { user } = userStore();

  return (
    <div className="flex flex-col w-full">
      {user && (
        <div className="flex flex-col break-all mb-2">
          <span className="font-bold">
            {t("sidebar_credits", { count: user?.credits })}
          </span>
          <span className="text-xs">{user.email}</span>
        </div>
      )}
      {/* TODO: re-enable once Supabase auth is migrated, currently broken */}
      {/* <LoginBtn /> */}
    </div>
  );
};
