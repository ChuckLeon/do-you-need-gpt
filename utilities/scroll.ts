const isBrowser = () => typeof window !== "undefined";

const windowScrollToTop = () => {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const elementScrollToTop = (ref: HTMLDivElement | null) => {
  ref?.scrollTo({ top: 0, behavior: "smooth" });
};

export { isBrowser, windowScrollToTop, elementScrollToTop };
