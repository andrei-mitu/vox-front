"use client"

import {Clock, Shield} from "lucide-react"
import {StatBadge} from "../StatBadge"
import {TabBar} from "../TabBar"
import {LoginForm} from "./LoginForm"
import {RequestAccessForm} from "./RequestAccessForm"

export type TabValue = "login" | "request"

interface AuthCardProps {
    activeTab: TabValue;
    onTabChange: (tab: TabValue) => void;
}

export function AuthCard({activeTab, onTabChange}: AuthCardProps) {
    return (
        <div className="w-full max-w-md">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
                <StatBadge value="500+" label="Active Fleets"/>
                <StatBadge value="24/7" label="Support"/>
                <StatBadge value="99.9%" label="Uptime"/>
            </div>
            {/* Card body */}
            <div
                className="w-full rounded-2xl p-8 border border-default"
                style={{backgroundColor: "var(--bg-secondary)", boxShadow: "var(--shadow-card)"}}
            >
                {/* Welcome header */}
                <div className="mb-6">
                    <h2 className="text-primary text-2xl font-semibold mb-1">Welcome Back</h2>
                    <p className="text-secondary text-sm">
                        Access your transport management dashboard
                    </p>
                </div>
                {/* Tabs */}
                <div className="mb-8">
                    <TabBar active={activeTab} onChange={onTabChange}/>
                </div>
                {/* Form */}
                {activeTab === "login" ? <LoginForm/> : <RequestAccessForm/>}
                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-default">
                    <div className="flex items-center justify-between text-xs text-muted mb-3">
                        <span className="flex items-center gap-1.5">
                            <Shield className="w-3 h-3"/> SSL Encrypted
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3"/> Version 2.4.1
                        </span>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-muted mb-1">
                            Need help? <a href="mailto:support@vox-tms.com"
                                          className="text-accent-primary hover:underline">support@vox-tms.com</a>
                        </p>
                        <p className="text-xs text-muted/60">© 2026 VOX Transport Management System. All rights
                            reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
