'use client';

import {TextArea, Text} from '@radix-ui/themes';
import type {ComponentPropsWithoutRef} from 'react';
import {cn} from '@/lib/utils/tw';

interface TextareaInputProps extends ComponentPropsWithoutRef<typeof TextArea> {
    label?: string;
    error?: string;
    hint?: string;
}

export function TextareaInput({label, error, hint, id, className, ...props}: TextareaInputProps) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <Text as="label" htmlFor={id} size="2" className="text-text-primary font-medium">
                    {label}
                </Text>
            )}
            <TextArea
                id={id}
                className={cn('resize-none', error && 'border-error', className)}
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