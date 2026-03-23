import {create} from "zustand"

import {
    applyTeamBrand,
    applyTheme,
    getActiveLogo,
    initTheme,
    type ResolvedTheme,
    saveThemePreference,
    type TeamBrand,
    type ThemePreference,
    watchSystemTheme,
} from "@/lib/theme"

// ─── State ────────────────────────────────────────────────────────────────────

type ThemeState = {
    preference: ThemePreference  // what the user chose: "system" | "light" | "dark"
    resolved: ResolvedTheme    // what's actually rendering: "light" | "dark"
    brand: TeamBrand | null
    isReady: boolean          // false until initTheme() has run — prevents flash
}

// ─── Actions ──────────────────────────────────────────────────────────────────

type ThemeActions = {
    // Call once in a top-level client component (e.g. app/layout.tsx provider)
    init: () => void

    // User-facing toggle — persists to localStorage
    setTheme: (preference: ThemePreference) => void

    // Called after login when brand data arrives from the API
    applyBrand: (brand: TeamBrand) => void

    // Clear brand on logout
    clearBrand: () => void

    // Derived — returns the right logo URL for the current resolved theme
    getLogoUrl: () => string | null
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useThemeStore = create<ThemeState & ThemeActions>((set, get) => ({
    preference: "system",
    resolved: "light",
    brand: null,
    isReady: false,

    init: () => {
        // Already initialised — guard against double calls (React StrictMode)
        if (get().isReady) return

        // Read localStorage + apply data-theme on <html>
        const {preference, resolved} = initTheme()
        set({preference, resolved, isReady: true})

        // Watch for OS-level theme changes when preference is "system"
        watchSystemTheme((resolved) => {
            set({resolved})
        })
    },

    setTheme: (preference) => {
        const resolved = applyTheme(preference)   // sets data-theme on <html>
        saveThemePreference(preference)           // persists to localStorage
        set({preference, resolved})
    },

    applyBrand: (brand) => {
        applyTeamBrand(brand)   // injects CSS variables on <html>
        set({brand})
    },

    clearBrand: () => {
        // Reset accent variables back to defaults defined in globals.css
        const root = document.documentElement
        root.style.removeProperty("--accent-primary")
        root.style.removeProperty("--accent-secondary")
        root.style.removeProperty("--accent-muted")
        root.style.removeProperty("--accent-foreground")
        set({brand: null})
    },

    getLogoUrl: () => {
        const {brand, resolved} = get()
        if (!brand) return null
        return getActiveLogo(brand, resolved)
    },
}))