// ─── Auth Service ─────────────────────────────────────────────────────────────
// This is the mock layer. It mirrors the real API contract exactly.
// When the backend is ready:
//   1. Replace the mock implementations with real apiFetch calls
//   2. Remove the delay() helper
//   3. Nothing else in the app changes — store and components are unaffected.

import { authEndpoints } from "@/lib/api"
import type {
    LoginStep1Payload,
    LoginStep1Response,
    AuthSuccessResponse,
    RequestAccessPayload,
    RequestAccessResponse,
    TeamBrand,
} from "@/types/auth"

// ─── Helpers ──────────────────────────────────────────────────────────────────

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_BRAND: TeamBrand = {
    accentPrimary:    "#4db8b0",
    accentSecondary:  "#2e8c85",
    accentMuted:      "rgba(77, 184, 176, 0.12)",
    accentForeground: "#ffffff",
    logoLight:        "/logo-light.svg",
    logoDark:         "/logo-dark.svg",
}

const MOCK_SINGLE_TEAM_RESPONSE: AuthSuccessResponse = {
    token: "mock-jwt-token-single",
    user:  { id: "u1", email: "user@vox.com", name: "Alex Munteanu" },
    team:  { id: "t1", name: "VOX Cargo", avatarUrl: undefined },
    brand: MOCK_BRAND,
}

const MOCK_MULTI_TEAM_RESPONSE: LoginStep1Response = {
    teams: [
        { id: "t1", name: "VOX Cargo" },
        { id: "t2", name: "VOX Admin" },
        { id: "t3", name: "VOX Logistics EU" },
    ],
}

// ─── Trigger Map ──────────────────────────────────────────────────────────────
// Control mock behaviour by email:
//   any email ending in @multi.com  → multi-team flow
//   wrong@wrong.com                 → error response
//   anything else                   → single team success

function getMockLoginResponse(email: string): LoginStep1Response | null {
    if (email.endsWith("@multi.com"))  return MOCK_MULTI_TEAM_RESPONSE
    if (email === "wrong@wrong.com")   return null   // signals error
    return MOCK_SINGLE_TEAM_RESPONSE
}

// ─── Service Methods ──────────────────────────────────────────────────────────

export const authService = {

    async loginStep1(payload: LoginStep1Payload): Promise<LoginStep1Response> {
        console.info(`[authService] POST ${authEndpoints.login}`, payload)
        await delay(800)

        const mockResponse = getMockLoginResponse(payload.email)

        if (!mockResponse) {
            throw { message: "Invalid email or password.", code: "INVALID_CREDENTIALS" }
        }

        return mockResponse
    },

    async loginStep2(
        payload: LoginStep1Payload & { teamId: string }
    ): Promise<AuthSuccessResponse> {
        console.info(`[authService] POST ${authEndpoints.login} (step 2)`, payload)
        await delay(600)

        // In the real API, the backend validates teamId ownership.
        // Here we always succeed and return a token for the selected team.
        return {
            token: `mock-jwt-token-team-${payload.teamId}`,
            user:  { id: "u1", email: payload.email, name: "Alex Munteanu" },
            team:  {
                id:   payload.teamId,
                name: MOCK_MULTI_TEAM_RESPONSE.teams?.find(
                    (t) => t.id === payload.teamId
                )?.name ?? "Unknown Team",
            },
            brand: MOCK_BRAND,
        }
    },

    async requestAccess(
        payload: RequestAccessPayload
    ): Promise<RequestAccessResponse> {
        console.info(`[authService] POST /auth/request-access`, payload)
        await delay(1000)

        // Simulate an occasional error for testing
        if (payload.email === "taken@taken.com") {
            throw { message: "A request for this email is already pending.", code: "ALREADY_PENDING" }
        }

        return {
            success: true,
            message: "Request received. We'll be in touch within 24 hours.",
        }
    },

}