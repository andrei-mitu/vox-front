"use client"

import {forwardRef, ButtonHTMLAttributes} from "react"

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean
}

export const TabButton = forwardRef<HTMLButtonElement, TabButtonProps>(
    ({active = false, className = "", children, ...props}, ref) => {
        return (
            <button
                ref={ref}
                role="tab"
                aria-selected={active}
                className={`
          flex-1 py-3 rounded-lg text-sm font-medium transition-all duration-250 cursor-pointer
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary
          ${active ? "bg-accent-primary text-[#1a2328]" : "bg-accent-secondary text-accent-primary hover:bg-accent-primary/30"}
          ${className}
        `}
                {...props}
            >
                {children}
            </button>
        )
    }
)
TabButton.displayName = "TabButton"
