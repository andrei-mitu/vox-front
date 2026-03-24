"use client";

import {useState} from "react";
import {BackgroundDecor} from "@/components/ui/auth/BackgroundDecor";
import {HeroPanel} from "@/components/ui/auth/HeroPanel";
import {AuthCard, TabValue} from "@/components/ui/auth/AuthCard";
import {tw} from "@/lib/utils/tw";

export default function Page() {
    const [activeTab, setActiveTab] = useState<TabValue>("login");

    return (
        <main
            className={tw(
                'relative min-h-screen flex overflow-hidden',
                'bg-primary'
            )}>
            <BackgroundDecor/>

            {/* Left — branding & features */}
            <HeroPanel/>

            {/* Right — auth card */}
            <div
                className={tw(
                    'flex-1 flex items-center justify-center relative z-10 px-12 py-16',
                    'bg-secondary'
                )}
            >
                <AuthCard activeTab={activeTab} onTabChange={setActiveTab}/>
            </div>
        </main>
    );
}