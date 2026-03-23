# VOX - Next.js Frontend

## Quick Start

```bash
bun install        # Install dependencies
bun run dev        # Development server at http://localhost:3000
bun run build      # Production build
bun run lint       # Lint with ESLint
```

## Stack

- **Framework**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **i18n**: next-intl — translations fetched from backend
- **State**: zustand (global stores), React useState (local)
- **Package Manager**: bun (NOT npm)
- **Validation**: Zod
- **UI Components**: @radix-ui/themes
- **Backend**: API (separate project, proxied via Next.js rewrites)

## Build Commands

```bash
bun run dev        # Start dev server
bun run build      # Production build
bun run start      # Start production server
bun run lint       # Run ESLint
```

## TypeScript Configuration

- Strict mode enabled (`"strict": true`)
- Path aliases via `@/*` → `./` (e.g., `@/components/auth/LoginForm`)
- JSX: `react-jsx`
- Module resolution: `bundler`

## Code Style Guidelines

### Imports

Group imports by type with blank lines between groups:

```typescript
// 1. "use client" directive (if client component)
"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"
import {Box, Button, Flex, Text, Checkbox} from "@radix-ui/themes"

import {LoginField} from "@/components/auth/LoginField"
import {useAuthStore} from "@/store/authStore"
import {ROUTES} from "@/constants/routes"
import {tw} from "@/lib/tw"
import type {LoginFormValues} from "@/lib/validations/auth"
```

- Use `type` keyword for type-only imports
- No default imports — use named exports
- Use `@/` path aliases for internal modules

### Formatting

- 4-space indentation
- Trailing commas in multiline destructuring
- Bracket notation for named exports: `import {foo} from "bar"`
- Semicolons at end of statements
- Use parentheses around arrow function return values when needed

### Naming Conventions

| Element              | Convention         | Example                          |
|----------------------|--------------------|----------------------------------|
| Components           | PascalCase         | `LoginForm`, `TeamSelector`      |
| React hooks          | camelCase + `use`  | `useAuthStore`, `useRouter`      |
| Variables/functions  | camelCase          | `handleStep1Submit`, `isLoading` |
| Types/interfaces     | PascalCase         | `AuthUser`, `TeamSelectFormValues` |
| Constants            | SCREAMING_SNAKE_CASE | `BASE_URL`, `ROUTES`           |
| Enums                | PascalCase         | `AuthStep`, `ThemeMode`          |
| CSS classes          | Tailwind utilities | `flex flex-col gap-4`            |
| Files                | kebab-case         | `login-form.tsx`, `auth-store.ts` |

### TypeScript

- Always enable strict mode checks
- Define types in `types/` directory, validation schemas in `lib/validations/`
- Use Zod for runtime validation with `.safeParse()`
- Extract inferred types with `z.infer<typeof Schema>`

```typescript
// Good: Type-safe validation
import {z} from "zod"

export const LoginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export type LoginFormValues = z.infer<typeof LoginSchema>
```

- Use `satisfies` for type assertions when needed
- Avoid `any` — use `unknown` for truly unknown types
- Use `Partial<Record<K, V>>` for optional field maps

### Component Patterns

**Server Components** (no interactivity):
```typescript
export default async function Page() {
    const data = await apiFetch<Competition[]>(endpoints.competitions)
    return <CompetitionList competitions={data} />
}
```

**Client Components** (with interactivity):
```typescript
"use client"

import {useState} from "react"

export function SearchBar() {
    const [query, setQuery] = useState("")
    // ...
}
```

- Always add `"use client"` at the top for client components
- Server components can be `async`
- Prefer receiving data as props rather than fetching in client components
- Use `Suspense` with skeleton fallbacks for loading states

### Error Handling

Custom error objects with `message` and optional `code`:

```typescript
// Throwing errors
throw {message: "Invalid email or password.", code: "INVALID_CREDENTIALS"}

// Catching errors
function extractError(err: unknown): string {
    if (typeof err === "object" && err !== null && "message" in err) {
        return (err as ApiError).message
    }
    return "Something went wrong. Please try again."
}
```

### File Organization

```
app/[locale]/           → Pages and route-specific components
  (auth)/               → Route groups (no URL segment)
  (public)/             → Public pages
components/
  auth/                 → Auth-related components
  ui/                   → Shared UI components (Pagination, Cards, Skeletons)
lib/                    → API clients, utilities
  services/             → API service functions (competitions.ts, authService.ts, etc.)
  validations/          → Zod schemas
  tw.ts                 → tailwind-merge wrapper (export const tw = twMerge)
types/                  → TypeScript interfaces (auth.ts, api.ts)
store/                  → Zustand stores (authStore.ts, themeStore.ts)
constants/              → Routes, config constants
```

### State Management

- **Zustand** for global state (auth, settings, theme)
- **useState** for local/component state
- State stores in `store/` directory
- Use `create<State & Actions>()` pattern with separate State and Actions types

```typescript
type AuthState = {
    user: AuthUser | null
    isLoading: boolean
    error: string | null
}

type AuthActions = {
    login: (payload: LoginPayload) => Promise<void>
    logout: () => void
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
    // ... initial state and actions
}))
```

### API Patterns

**Server-side** (direct to backend, cached):
```typescript
import {apiFetch} from "@/lib/api"
const data = await apiFetch<Competition[]>(endpoints.competitions, {
    revalidate: 3600,
    tags: ["competitions"],
})
```

**Client-side** (through proxy for cookies):
```typescript
import {clientApiFetch} from "@/lib/api-client"
const data = await clientApiFetch<Competition[]>(endpoints.competitions, locale)
```

### CSS and Styling

- Use Tailwind CSS utility classes exclusively
- Use `@radix-ui/themes` primitives (`Box`, `Flex`, `Text`, `Button`, etc.)
- Merge Tailwind classes with `tw()` utility from `@/lib/tw`

```typescript
<Flex
    className={tw(
        "flex flex-col gap-4",
        isLoading && "pointer-events-none opacity-60"
    )}
/>
```

### Comments

Use section separators for major code blocks:

```typescript
// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {}

// ─── Initial Values ───────────────────────────────────────────────────────────

const initialValues = {}

// ─── Component ────────────────────────────────────────────────────────────────

export function MyComponent() {}
```

## Conventions

- Locales: `en`, `ro` (default: `en`)
- API responses wrapped in `{success: boolean, data: T}` envelope
- Paginated responses: `{data: T[], pagination: {current_page, last_page, per_page, total, from, to}}`
- Dark mode via cookie (`theme=dark|light`)
- Use immutable patterns (no mutation)
- Files < 800 lines, functions < 50 lines when possible
