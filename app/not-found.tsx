import { NeedAiIcon } from "@/components/icons/NeedAiIcon";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ErrorPage() {
  const t = useTranslations();

  return (
    <div className="flex flex-col justify-center items-center p-12 m-auto min-h-[100dvh] max-w-screen-md gap-4">
      <NeedAiIcon className="mx-auto w-[100px] h-[100px]" />
      <span>{t("page_not_found")}</span>
      <Link href="/" className="btn btn-primary">
        {t("return_text")}
      </Link>
    </div>
  );
}
