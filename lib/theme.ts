// ─── Types ────────────────────────────────────────────────────────────────────

export type ThemePreference = "system" | "light" | "dark"
export type ResolvedTheme = "light" | "dark"

export type TeamBrand = {
    accentPrimary: string   // e.g. "#4db8b0"
    accentSecondary: string   // e.g. "#2e8c85"
    accentMuted: string   // e.g. "rgba(77, 184, 176, 0.12)"
    accentForeground: string   // text on accent bg — e.g. "#ffffff"
    logoLight: string   // URL — used on light backgrounds
    logoDark: string   // URL — used on dark backgrounds
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "vox:theme"
const THEME_ATTR = "data-theme"

// ─── System Preference ────────────────────────────────────────────────────────

function getSystemTheme(): ResolvedTheme {
    if (typeof window === "undefined") return "light"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
}

// ─── Resolve ──────────────────────────────────────────────────────────────────
// Converts a preference (which may be "system") into an actual "light" | "dark"

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
    return preference === "system" ? getSystemTheme() : preference
}

// ─── Apply ────────────────────────────────────────────────────────────────────
// Sets data-theme on <html>. Called on initial load and on every toggle.

export function applyTheme(preference: ThemePreference): ResolvedTheme {
    const resolved = resolveTheme(preference)
    document.documentElement.setAttribute(THEME_ATTR, resolved)
    return resolved
}

// ─── Persist ──────────────────────────────────────────────────────────────────

export function saveThemePreference(preference: ThemePreference): void {
    try {
        localStorage.setItem(STORAGE_KEY, preference)
    } catch {
        // localStorage unavailable (private browsing, storage quota) — fail silently
    }
}

export function loadThemePreference(): ThemePreference {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored === "light" || stored === "dark" || stored === "system") {
            return stored
        }
    } catch {
        // localStorage unavailable — fall back to system
    }
    return "system"
}

// ─── Init (call once at app startup) ─────────────────────────────────────────
// Loads saved preference, applies it, returns both values for the store.

export function initTheme(): { preference: ThemePreference; resolved: ResolvedTheme } {
    const preference = loadThemePreference()
    const resolved = applyTheme(preference)
    return {preference, resolved}
}

// ─── System Preference Listener ───────────────────────────────────────────────
// When user preference is "system", we watch for OS-level changes and re-apply.
// Returns a cleanup function — call it on unmount.

export function watchSystemTheme(
    onThemeChange: (resolved: ResolvedTheme) => void
): () => void {
    if (typeof window === "undefined") return () => {
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handler = (e: MediaQueryListEvent) => {
        // Only react if user hasn't overridden with a manual preference
        const preference = loadThemePreference()
        if (preference !== "system") return

        const resolved: ResolvedTheme = e.matches ? "dark" : "light"
        document.documentElement.setAttribute(THEME_ATTR, resolved)
        onThemeChange(resolved)
    }

    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
}

// ─── Team Brand ───────────────────────────────────────────────────────────────
// Injects team brand colors as CSS variables on <html>.
// Overrides Layer 1 accent tokens. Called once after login.

export function applyTeamBrand(brand: TeamBrand): void {
    const root = document.documentElement

    root.style.setProperty("--vox-accent", brand.accentPrimary)
    root.style.setProperty("--accent-secondary", brand.accentSecondary)
    root.style.setProperty("--accent-muted", brand.accentMuted)
    root.style.setProperty("--accent-foreground", brand.accentForeground)
}

// ─── Active Logo ──────────────────────────────────────────────────────────────
// Returns the correct logo URL for the current resolved theme.
// Use this wherever the logo is rendered.

export function getActiveLogo(
    brand: TeamBrand,
    resolved: ResolvedTheme
): string {
    return resolved === "dark" ? brand.logoDark : brand.logoLight
}

// ─── Inline Script (anti-flash) ───────────────────────────────────────────────
// Paste this as a <script> tag in app/layout.tsx BEFORE any content renders.
// It runs synchronously, setting data-theme before React hydrates,
// so the user never sees a flash of the wrong theme.
//
// Usage in layout.tsx:
//   <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />

export const THEME_SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem("vox:theme");
    var preference = (stored === "light" || stored === "dark" || stored === "system")
      ? stored
      : "system";
    var resolved = preference === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : preference;
    document.documentElement.setAttribute("data-theme", resolved);
  } catch (e) {}
})();
`.trim()