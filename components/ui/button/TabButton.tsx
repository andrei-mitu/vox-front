'use client';

import {Button} from "./Button";

interface TabButtonProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

export function TabButton({label, active, onClick}: TabButtonProps) {
    return (
        <Button
            variant={active ? "ghost" : "primary"}
            onClick={onClick}
            className="flex-1"
        >
            {label}
        </Button>
    );
}