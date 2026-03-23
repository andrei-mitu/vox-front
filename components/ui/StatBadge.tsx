interface StatBadgeProps {
    value: string;
    label: string;
}

export function StatBadge({ value, label }: StatBadgeProps) {
    return (
        <div className="login-stat-badge">
            <div className="text-2xl mb-1" style={{ color: 'var(--login-brand)' }}>{value}</div>
            <div className="text-xs" style={{ color: 'var(--login-text-muted)' }}>{label}</div>
        </div>
    );
}