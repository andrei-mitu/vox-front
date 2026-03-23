// ─── Entities ────────────────────────────────────────────────────────────────

export type Team = {
    id: string
    name: string
    avatarUrl?: string
}

export type AuthUser = {
    id: string
    email: string
    name: string
}

// ─── Brand ───────────────────────────────────────────────────────────────────

export type TeamBrand = {
    accentPrimary:    string
    accentSecondary:  string
    accentMuted:      string
    accentForeground: string
    logoLight:        string
    logoDark:         string
}

// ─── Request Payloads ────────────────────────────────────────────────────────

export type LoginStep1Payload = {
    email: string
    password: string
    rememberMe: boolean
}

export type LoginStep2Payload = LoginStep1Payload & {
    teamId: string
}

export type RequestAccessPayload = {
    email: string
    name: string
    phone: string
    companyName: string
    position: string
}

// ─── API Responses ───────────────────────────────────────────────────────────

export type AuthSuccessResponse = {
    token: string
    user: AuthUser
    team: Team
    brand?: TeamBrand        // optional until backend is ready
}

export type AuthTeamsResponse = {
    teams: Team[]
}

export type RequestAccessResponse = {
    success: boolean
    message: string          // e.g. "We'll be in touch within 24 hours."
}

// Union — what step 1 can return
export type LoginStep1Response = AuthSuccessResponse | AuthTeamsResponse

// Narrowing helpers — use these instead of casting anywhere in the app
export const isTeamsResponse = (
    res: LoginStep1Response
): res is AuthTeamsResponse => "teams" in res

export const isSuccessResponse = (
    res: LoginStep1Response
): res is AuthSuccessResponse => "token" in res

// ─── Errors ──────────────────────────────────────────────────────────────────

export type ApiError = {
    message: string
    code?: string
}