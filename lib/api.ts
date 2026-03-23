import {ApiError} from "@/types/auth"

// ─── Config ───────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

// ─── Types ────────────────────────────────────────────────────────────────────

type RequestOptions = Omit<RequestInit, "body"> & {
    body?: Record<string, unknown>
}

// ─── Core Wrapper ─────────────────────────────────────────────────────────────

export async function apiFetch<T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    if (!process.env.NEXT_PUBLIC_API_URL) {
        throw {message: "NEXT_PUBLIC_API_URL is not defined. Set it in your environment variables."} satisfies ApiError
    }

    const {body, headers, ...rest} = options

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...rest,
        credentials: "include", // always send/receive httpOnly cookies
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    })

    // Try to parse JSON regardless of status —
    // backend should always return a JSON body, even for errors
    let data: unknown
    try {
        data = await response.json()
    } catch {
        throw {message: "Server returned an unexpected response."} satisfies ApiError
    }

    if (!response.ok) {
        // Cast to ApiError — backend should return { message, code? }
        const error = data as ApiError
        throw error
    }

    return data as T
}

// ─── Auth Endpoints ───────────────────────────────────────────────────────────
// Centralise endpoint paths here so they're never hardcoded in the store.

export const authEndpoints = {
    login: "/auth/login",
} as const