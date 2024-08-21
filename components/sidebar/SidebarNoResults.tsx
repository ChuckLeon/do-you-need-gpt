import { useTranslations } from "next-intl";
import React from "react";

export const SidebarNoResults = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col h-full">
      <p className="m-auto text-xs text-center">{t("sidebar_no_search")}</p>
    </div>
  );
};
