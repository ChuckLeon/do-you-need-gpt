"use client";

import { useAuth } from "@/hooks/useAuth";
import { userStore } from "@/store/userStore";
import { useTranslations } from "next-intl";
import Link from "next/link";

const LoginBtn = () => {
  const t = useTranslations();
  const { signOut } = useAuth();
  const { user } = userStore();

  if (user) {
    return (
      <button className="btn btn-primary btn-sm" onClick={signOut}>
        {t("logout_title")}
      </button>
    );
  }

  return (
    <Link className="btn btn-primary btn-sm" href={"/login"}>
      {t("login_title")}
    </Link>
  );
};

export default LoginBtn;
