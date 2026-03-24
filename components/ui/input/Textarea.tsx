"use client"

import {forwardRef, TextareaHTMLAttributes} from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({label, id, className = "", ...props}, ref) => (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={id} className="text-sm text-primary">
                    {label}
                </label>
            )}
            <textarea
                ref={ref}
                id={id}
                className={`
          w-full px-4 py-3 rounded-lg text-sm resize-none
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
Textarea.displayName = "Textarea"
