'use client';

import {TextField, Text} from '@radix-ui/themes';
import type {ComponentPropsWithoutRef} from 'react';
import {cn} from '@/lib/utils/tw';

interface TextInputProps extends ComponentPropsWithoutRef<typeof TextField.Root> {
    label?: string;
    error?: string;
    hint?: string;
}

export function TextInput({label, error, hint, id, className, ...props}: TextInputProps) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <Text as="label" htmlFor={id} size="2" className="text-text-primary font-medium">
                    {label}
                </Text>
            )}
            <TextField.Root
                id={id}
                className={cn(error && 'border-error', className)}
                {...props}
            />
            {error && (
                <Text size="1" className="text-error">{error}</Text>
            )}
            {hint && !error && (
                <Text size="1" className="text-text-muted">{hint}</Text>
            )}
        </div>
    );
}