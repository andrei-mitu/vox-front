'use client';

import {TextField, Text} from '@radix-ui/themes';
import {Eye, EyeOff} from 'lucide-react';
import {useState} from 'react';
import type {ComponentPropsWithoutRef} from 'react';
import {cn} from '@/lib/utils/tw';

interface PasswordInputProps extends Omit<ComponentPropsWithoutRef<typeof TextField.Root>, 'type'> {
    label?: string;
    error?: string;
    hint?: string;
}

export function PasswordInput({label, error, hint, id, className, ...props}: PasswordInputProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <Text as="label" htmlFor={id} size="2" className="text-text-primary font-medium">
                    {label}
                </Text>
            )}
            <TextField.Root
                id={id}
                type={visible ? 'text' : 'password'}
                className={cn(error && 'border-error', className)}
                {...props}
            >
                <TextField.Slot side="right">
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                        aria-label={visible ? 'Hide password' : 'Show password'}
                    >
                        {visible ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                    </button>
                </TextField.Slot>
            </TextField.Root>
            {error && (
                <Text size="1" className="text-error">{error}</Text>
            )}
            {hint && !error && (
                <Text size="1" className="text-text-muted">{hint}</Text>
            )}
        </div>
    );
}