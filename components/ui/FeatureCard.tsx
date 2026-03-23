import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <div className="login-feature-card">
            <Icon className="w-6 h-6 mb-2" style={{ color: 'var(--login-brand)' }} />
            <h3 className="text-sm mb-1" style={{ color: 'var(--login-text)' }}>{title}</h3>
            <p className="text-xs" style={{ color: 'var(--login-text-dim)' }}>{description}</p>
        </div>
    );
}