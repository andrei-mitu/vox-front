import { z } from "zod"

// ─── Step 1: Login ────────────────────────────────────────────────────────────

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),

    rememberMe: z.boolean().default(false),
})

// ─── Step 2: Team Selection ───────────────────────────────────────────────────

export const TeamSelectSchema = z.object({
    teamId: z.string().min(1, "Please select a team"),
})

// ─── Step 3: Request Access ───────────────────────────────────────────────────

export const RequestAccessSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),

    name: z
        .string()
        .min(1, "Full name is required")
        .min(2, "Name must be at least 2 characters"),

    phone: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^\+?[\d\s\-().]{7,20}$/, "Enter a valid phone number"),

    companyName: z
        .string()
        .min(1, "Company name is required"),

    position: z
        .string()
        .min(1, "Your position is required"),
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type LoginFormValues         = z.infer<typeof LoginSchema>
export type TeamSelectFormValues    = z.infer<typeof TeamSelectSchema>
export type RequestAccessFormValues = z.infer<typeof RequestAccessSchema>