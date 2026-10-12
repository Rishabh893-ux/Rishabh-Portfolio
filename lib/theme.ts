export type Theme = "light" | "dark";

export const THEME_KEY = "theme";

/** The violet dark theme is the default; the beige & gold theme is one click away. */
export const DEFAULT_THEME: Theme = "dark";

/**
 * Runs inline in <head> before first paint: use the visitor's saved choice,
 * otherwise the default theme, so the page never flashes the wrong theme.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t="${DEFAULT_THEME}";}document.documentElement.classList.toggle("light",t==="light");}catch(e){}})();`;

export function getTheme(): Theme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.classList.toggle("light", theme === "light");
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage can be blocked (private mode); the choice then lasts for this visit only.
  }
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  window.setTimeout(() => root.classList.remove("theme-transition"), 400);
}

export function toggleTheme() {
  setTheme(getTheme() === "light" ? "dark" : "light");
}
