'use client';

interface TabButtonProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

export function TabButton({ label, active, onClick }: TabButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex-1 py-3 rounded-lg transition-all duration-300 text-sm font-medium cursor-pointer ${active ? 'ring-2 ring-accent-primary shadow-lg' : ''}`}
            style={{
                backgroundColor: active ? 'var(--login-brand)' : 'var(--login-brand-subtle)',
                color: active ? 'var(--login-brand-fg)' : 'var(--login-brand)',
                boxShadow: active ? '0 0 8px var(--accent-primary)' : undefined,
            }}
        >
            {label}
        </button>
    );
}