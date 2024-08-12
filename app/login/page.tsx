import { NeedAiIcon } from "@/components/icons/NeedAiIcon";
import { login, signup } from "./actions";
import { useTranslations } from "next-intl";
import { LoginActions } from "@/components/loginActions/LoginActions";
import Link from "next/link";

export default function LoginPage() {
  const t = useTranslations();

  return (
    <>
      <div className="fixed top-2 left-2">
        <Link href="/" className="btn btn-ghost btn-sm">
          {`<- ${t("home_link_title")}`}
        </Link>
      </div>
      <div className="flex flex-col justify-center p-3 m-auto min-h-[100dvh] max-w-screen-md gap-4 sm:p-12">
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
          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="input input-bordered w-full"
            />
            <div className="label">
              <span className="label-text-alt">
                {t("login_password_criterias")}
              </span>
            </div>
          </div>
          <LoginActions login={login} signup={signup} />
        </form>
      </div>
    </>
  );
}
