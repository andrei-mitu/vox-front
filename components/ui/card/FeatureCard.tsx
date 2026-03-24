import {Box, Text} from '@radix-ui/themes';
import type {LucideIcon} from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export function FeatureCard({icon: Icon, title, description}: FeatureCardProps) {
    return (
        <Box p="4" style={{
            backgroundColor: 'rgba(38, 50, 56, 0.3)',
            border: '1px solid var(--vox-text-muted)',
            backdropFilter: 'blur(4px)',
            borderRadius: 'var(--radius-3)',
        }}>
            <Icon className="w-6 h-6 mb-2" style={{color: 'var(--vox-accent)'}}/>
            <Text as="p" size="2" weight="medium" style={{color: 'var(--vox-text-primary)'}}>{title}</Text>
            <Text as="p" size="1" style={{color: 'var(--vox-text-secondary)'}}>{description}</Text>
        </Box>
    );
}