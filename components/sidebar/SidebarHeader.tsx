import { Dispatch, SetStateAction } from "react";
import { NeedAiIcon } from "../icons/NeedAiIcon";
import { useTranslations } from "next-intl";
import { PanelIcon } from "../icons/PanelIcon";

interface ISidebarHeader {
  setSidebarIsClosed: Dispatch<SetStateAction<boolean>>;
}

export const SidebarHeader = ({ setSidebarIsClosed }: ISidebarHeader) => {
  const t = useTranslations();

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <NeedAiIcon />
        <h2>{t("sidebar_title")}</h2>
      </div>
      <button
        className="p-1 btn btn-sm btn-circle"
        onClick={() => setSidebarIsClosed((prev) => !prev)}
      >
        <PanelIcon />
      </button>
    </div>
  );
};
