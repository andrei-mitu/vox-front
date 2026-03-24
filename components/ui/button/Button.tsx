import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "@/lib/utils/tw"

const buttonVariants = cva(
    "gap-2 " +
    "inline-flex " +
    "font-medium " +
    "items-center " +
    "duration-150 " +
    "tracking-wide " +
    "justify-center " +
    "transition-all " +
    "cursor-pointer " +
    "focus-visible:ring-2 " +
    "focus-visible:outline-none " +
    "focus-visible:ring-offset-2 " +
    "disabled:opacity-40 " +
    "disabled:pointer-events-none " +
    "focus-visible:ring-[var(--vox-accent)] " +
    "focus-visible:ring-offset-[var(--bg-primary)]",
    {
        variants: {
            variant: {
                primary:
                    "active:scale-[0.97] " +
                    "text-[var(--bg-primary)] " +
                    "bg-[var(--vox-accent)] " +
                    "hover:bg-[var(--accent-secondary)] " +
                    "shadow-[0_0_8px_var(--vox-accent)] " +
                    "hover:shadow-[0_0_12px_var(--accent-secondary)] ",
                secondary:
                    "border " +
                    "active:scale-[0.97] " +
                    "bg-[var(--bg-secondary)] " +
                    "text-[var(--vox-text-primary)] " +
                    "border-[var(--border-subtle)] " +
                    "hover:border-[var(--vox-accent)] " +
                    "hover:text-[var(--vox-accent)] ",
                ghost:
                    "border " +
                    "bg-transparent " +
                    "active:scale-[0.97] " +
                    "text-[var(--vox-text-secondary)] " +
                    "border-[var(--vox-accent)] " +
                    "hover:text-[var(--vox-text-primary)] " +
                    "hover:bg-[var(--vox-accent)]/10 ",
            },
            size: {
                icon: "h-9 w-9 rounded-md",
                sm: "h-8 px-3 text-xs rounded-md",
                md: "h-9 px-4 text-sm rounded-md",
                lg: "h-11 px-6 text-base rounded-lg",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                ref={ref}
                className={cn(buttonVariants({variant, size}), className)}
                {...props}
            />
        )
    }
)

Button.displayName = "Button"

export {Button, buttonVariants}