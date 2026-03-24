"use client"

import {InputHTMLAttributes} from "react"

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    id?: string
}

export function Checkbox({label, id, className = "", ...props}: CheckboxProps) {
    return (
        <label htmlFor={id} className="flex items-center gap-2 text-secondary cursor-pointer select-none">
            <input
                type="checkbox"
                id={id}
                className={`w-4 h-4 rounded accent-(--accent-primary) ${className}`}
                {...props}
            />
            <span className="text-sm">{label}</span>
        </label>
    )
}
