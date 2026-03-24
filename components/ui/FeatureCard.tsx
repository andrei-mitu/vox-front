"use client"

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export function FeatureCard({icon, title, description}: FeatureCardProps) {
    return (
        <div
            className="p-4 rounded-xl border border-default backdrop-blur-sm"
            style={{backgroundColor: "rgba(38,50,56,.4)"}}
        >
            <div className="text-accent-primary mb-3">{icon}</div>
            <h3 className="text-primary text-sm font-medium mb-1">{title}</h3>
            <p className="text-muted text-xs">{description}</p>
        </div>
    );
}
