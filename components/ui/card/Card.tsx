import {Card as RadixCard} from '@radix-ui/themes';
import type {ComponentPropsWithoutRef} from 'react';
import {cn} from '@/lib/utils/tw';

type CardProps = ComponentPropsWithoutRef<typeof RadixCard>;

export function Card({className, children, ...props}: CardProps) {
    return (
        <RadixCard
            className={cn('bg-bg-primary border border-white/5', className)}
            {...props}
        >
            {children}
        </RadixCard>
    );
}