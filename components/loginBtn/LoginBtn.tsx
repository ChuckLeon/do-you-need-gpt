"use client";

import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import Link from "next/link";

const LoginBtn = () => {
  const t = useTranslations();
  const { user, signOut } = useAuth();

  return (
    <div className="fixed top-0 right-0">
      {user ? (
        <button className="btn btn-ghost" onClick={signOut}>
          {t("logout_title")}
        </button>
      ) : (
        <Link className="btn btn-ghost" href={"/login"}>
          {t("login_title")}
        </Link>
      )}
    </div>
  );
};

export default LoginBtn;
