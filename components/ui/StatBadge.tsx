"use client"

interface StatBadgeProps {
    value: string;
    label: string;
}

export function StatBadge({value, label}: StatBadgeProps) {
    return (
        <div
            className="text-center p-3 rounded-lg border border-default"
            style={{backgroundColor: "rgba(35,35,35,.35)"}}
        >
            <div className="text-2xl font-semibold text-accent-primary">{value}</div>
            <div className="text-xs text-secondary mt-0.5">{label}</div>
        </div>
    );
}
