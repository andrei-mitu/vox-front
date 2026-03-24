"use client"

import {TrendingUp, MapPin, Clock, Shield, Truck} from "lucide-react"
import {FeatureCard} from "../FeatureCard"

export function HeroPanel() {
    const features = [
        {icon: <TrendingUp className="w-5 h-5"/>, title: "Real-time Analytics", description: "Live performance metrics"},
        {icon: <MapPin className="w-5 h-5"/>, title: "GPS Tracking", description: "24/7 fleet monitoring"},
        {icon: <Clock className="w-5 h-5"/>, title: "Route Optimization", description: "AI-powered efficiency"},
        {icon: <Shield className="w-5 h-5"/>, title: "Secure Platform", description: "Enterprise-grade security"},
    ];
    return (
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-12">
            <div className="max-w-lg w-full">
                {/* Logo */}
                <div className="mb-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3.5 rounded-xl" style={{backgroundColor: "var(--accent-muted)"}}>
                            <Truck className="w-10 h-10 text-accent-primary" />
                        </div>
                        <h1 className="text-[4.5rem] font-bold tracking-[0.2em] leading-none" style={{color: "var(--accent-primary)"}}>
                            VOX
                        </h1>
                    </div>
                    <p className="text-primary text-xl mb-2">Transport Management System</p>
                    <p className="text-secondary text-base leading-relaxed">
                        Streamline your logistics operations with real-time tracking, intelligent routing,
                        and comprehensive fleet management.
                    </p>
                </div>
                {/* Feature grid */}
                <div className="grid grid-cols-2 gap-3">
                    {features.map((f) => (
                        <FeatureCard key={f.title} {...f} />
                    ))}
                </div>
            </div>
        </div>
    );
}
