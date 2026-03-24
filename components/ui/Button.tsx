"use client"

import {forwardRef, ButtonHTMLAttributes} from "react"
// No icon imports needed for Button

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "solid" | "ghost"
    fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({variant = "solid", fullWidth = false, className = "", children, ...props}, ref) => {
        const base =
            "py-3 px-6 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary disabled:opacity-50"
        const variants = {
            solid: "bg-accent-primary text-[#1a2328] hover:opacity-90 active:scale-[.98]",
            ghost: "bg-accent-secondary text-accent-primary hover:bg-accent-primary hover:text-[#1a2328]",
        }
        return (
            <button
                ref={ref}
                className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
                {...props}
            >
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"
