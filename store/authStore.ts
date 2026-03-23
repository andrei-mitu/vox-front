import { create } from "zustand"

import { authService } from "@/services/authService"
import { useThemeStore } from "@/store/themeStore"
import type {
    AuthUser,
    Team,
    TeamBrand,
    LoginStep1Payload,
    AuthSuccessResponse,
    RequestAccessPayload,
    ApiError,
} from "@/types/auth"

// ─── State ────────────────────────────────────────────────────────────────────

type AuthState = {
    // Session
    user:  AuthUser | null
    team:  Team | null
    brand: TeamBrand | null

    // Multi-team flow
    step:               1 | 2
    teams:              Team[]
    pendingCredentials: LoginStep1Payload | null

    // Request access
    accessRequested: boolean
    accessMessage:   string | null

    // Async
    isLoading: boolean
    error:     string | null
}

// ─── Actions ──────────────────────────────────────────────────────────────────

type AuthActions = {
    loginStep1:     (payload: LoginStep1Payload) => Promise<void>
    loginStep2:     (teamId: string) => Promise<void>
    requestAccess:  (payload: RequestAccessPayload) => Promise<void>
    reset:          () => void
}

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: AuthState = {
    user:               null,
    team:               null,
    brand:              null,
    step:               1,
    teams:              [],
    pendingCredentials: null,
    accessRequested:    false,
    accessMessage:      null,
    isLoading:          false,
    error:              null,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function applyAuthSuccess(
    set: (partial: Partial<AuthState>) => void,
    data: AuthSuccessResponse
) {
    if (data.brand) {
        useThemeStore.getState().applyBrand(data.brand)
    }

    set({
        user:               data.user,
        team:               data.team,
        brand:              data.brand ?? null,
        step:               1,
        teams:              [],
        pendingCredentials: null,
        isLoading:          false,
        error:              null,
    })
}

function extractError(err: unknown): string {
    if (typeof err === "object" && err !== null && "message" in err) {
        return (err as ApiError).message
    }
    return "Something went wrong. Please try again."
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
    ...initialState,

    loginStep1: async (payload) => {
        set({ isLoading: true, error: null })

        try {
            const data = await authService.loginStep1(payload)

            if ("token" in data) {
                applyAuthSuccess(set, data)
                return
            }

            if ("teams" in data) {
                set({
                    step:               2,
                    teams:              data.teams,
                    pendingCredentials: payload,
                    isLoading:          false,
                    error:              null,
                })
                return
            }

            set({ error: "Unexpected response from server.", isLoading: false })
        } catch (err) {
            set({ error: extractError(err), isLoading: false })
        }
    },

    loginStep2: async (teamId) => {
        const { pendingCredentials } = get()

        if (!pendingCredentials) {
            set({ error: "Session expired. Please log in again.", step: 1 })
            return
        }

        set({ isLoading: true, error: null })

        try {
            const data = await authService.loginStep2({ ...pendingCredentials, teamId })
            applyAuthSuccess(set, data)
        } catch (err) {
            set({ error: extractError(err), isLoading: false })
        }
    },

    requestAccess: async (payload) => {
        set({ isLoading: true, error: null, accessRequested: false, accessMessage: null })

        try {
            const data = await authService.requestAccess(payload)
            set({
                accessRequested: true,
                accessMessage:   data.message,
                isLoading:       false,
            })
        } catch (err) {
            set({ error: extractError(err), isLoading: false })
        }
    },

    reset: () => {
        useThemeStore.getState().clearBrand()
        set(initialState)
    },
}))