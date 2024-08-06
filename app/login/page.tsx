import { NeedAiIcon } from "@/components/icons/NeedAiIcon";
import { login, signup } from "./actions";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations();

  // TODO: add loading state

  return (
    <div className="flex flex-col justify-center p-12 m-auto min-h-[100dvh] max-w-screen-md gap-4">
      <NeedAiIcon className="mx-auto w-[100px] h-[100px]" />
      <form className="flex flex-col gap-4">
        <label htmlFor="email">{t("login_email")}</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="input input-bordered"
        />
        <label htmlFor="password">{t("login_password")}</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="input input-bordered"
        />
        <button className="btn btn-primary" formAction={login}>
          {t("login_title")}
        </button>
        <button className="btn btn-ghost" formAction={signup}>
          {t("signup_title")}
        </button>
      </form>
    </div>
  );
}
