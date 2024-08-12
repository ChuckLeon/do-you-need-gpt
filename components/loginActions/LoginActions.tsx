"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "react-toastify";

type AuthAction = "login" | "signup";

interface ILoginActions {
  login: (formData: FormData) => Promise<AuthError>;
  signup: (formData: FormData) => Promise<AuthError>;
}

export const LoginActions = ({ login, signup }: ILoginActions) => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState<AuthAction>("login");

  const handleChangeLoginAction = () => {
    setActionType((prev) => (prev === "login" ? "signup" : "login"));
  };

  const handleActionBtnClick = () => {
    setIsLoading(true);
  };

  const handleFormAction = async (formData: FormData) => {
    setIsLoading(true);

    try {
      if (actionType === "login") {
        await login(formData);
      } else {
        await signup(formData);
      }
    } catch (error) {
      toast.error(
        actionType === "login"
          ? t("login_general_error")
          : t("signup_general_error")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <label className="label cursor-pointer">
        <span className="label-text"></span>
        <button type="button" onClick={handleChangeLoginAction}>
          {actionType === "login" ? t("signup_title") : t("login_title")}?
        </button>
      </label>

      <button
        className="btn btn-primary w-full"
        onClick={handleActionBtnClick}
        formAction={handleFormAction} //Server call
      >
        {actionType === "login" ? t("login_title") : t("signup_title")}
        {isLoading && <span className="loading loading-spinner "></span>}
      </button>
    </div>
  );
};
