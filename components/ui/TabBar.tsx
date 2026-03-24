"use client"

import {TabButton} from "./TabButton"
import {TabValue} from "@/components/ui/auth/AuthCard";


interface TabBarProps {
    active: TabValue;
    onChange: (tab: TabValue) => void;
}

export function TabBar({active, onChange}: TabBarProps) {
    return (
        <div role="tablist" className="flex gap-3">
            <TabButton active={active === "login"} onClick={() => onChange("login")}>
                Login
            </TabButton>
            <TabButton active={active === "request"} onClick={() => onChange("request")}>
                Request Access
            </TabButton>
        </div>
    )
}
