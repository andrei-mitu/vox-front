"use client"

import {forwardRef, InputHTMLAttributes} from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({label, id, className = "", ...props}, ref) => (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={id} className="text-sm text-primary">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={id}
                className={`
          w-full px-4 py-3 rounded-lg text-sm
          bg-accent-muted border border-default
          text-primary placeholder:text-muted
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent
          ${className}
        `}
                {...props}
            />
        </div>
    )
)
Input.displayName = "Input"
