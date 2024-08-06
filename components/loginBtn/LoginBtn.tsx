"use client";

import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import Link from "next/link";

const LoginBtn = () => {
  const t = useTranslations();
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <button className="btn btn-primary" onClick={signOut}>
        {t("logout_title")}
      </button>
    );
  }

  return (
    <Link className="btn btn-primary" href={"/login"}>
      {t("login_title")}
    </Link>
  );
};

export default LoginBtn;
