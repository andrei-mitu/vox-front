'use client';

import {useState} from 'react';
import {Clock, MapPin, Package, Shield, TrendingUp, Truck} from 'lucide-react';
import {FeatureCard} from '@/components/ui/FeatureCard';
import {StatBadge} from '@/components/ui/StatBadge';
import {TabButton} from '@/components/ui/TabButton';
import {LoginForm} from '@/components/ui/LoginForm';
import {RequestAccessForm} from '@/components/ui/RequestAccessForm';

// ─── Static data ─────────────────────────────────────────────────────────────

const FEATURES = [
    {icon: TrendingUp, title: 'Real-time Analytics', description: 'Live performance metrics'},
    {icon: MapPin, title: 'GPS Tracking', description: '24/7 fleet monitoring'},
    {icon: Clock, title: 'Route Optimization', description: 'AI-powered efficiency'},
    {icon: Shield, title: 'Secure Platform', description: 'Enterprise-grade security'},
] as const;

const STATS = [
    {value: '500+', label: 'Active Fleets'},
    {value: '24/7', label: 'Support'},
    {value: '99.9%', label: 'Uptime'},
] as const;

type Tab = 'login' | 'request';

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState<Tab>('login');

    return (
        <div className="flex w-full h-screen">

            {/* ── Grid Background ── */}
            <div className="absolute inset-0 login-grid-bg"/>

            {/* ── Decorative floating icons ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <Truck className="absolute top-20 left-[15%] w-32 h-32  rotate-12"
                       style={{color: 'var(--login-brand)', opacity: 0.05}}/>
                <Package className="absolute bottom-32 left-[10%] w-24 h-24 -rotate-12"
                         style={{color: 'var(--login-brand)', opacity: 0.05}}/>
                <MapPin className="absolute top-[40%] left-[5%] w-20 h-20"
                        style={{color: 'var(--login-brand)', opacity: 0.05}}/>
            </div>

            {/* ── Left — Hero ── */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-12">
                <div className="max-w-lg">

                    {/* Logo */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 rounded-xl" style={{backgroundColor: 'var(--login-brand-muted)'}}>
                                <Truck className="w-12 h-12" style={{color: 'var(--login-brand)'}}/>
                            </div>
                            <h1
                                className="text-[5rem]"
                                style={{color: 'var(--login-brand)', fontWeight: 700, letterSpacing: '0.2em'}}
                            >
                                VOX
                            </h1>
                        </div>
                        <p className="text-2xl mb-3" style={{color: 'var(--login-text)'}}>
                            Transport Management System
                        </p>
                        <p className="text-lg leading-relaxed" style={{color: 'var(--login-text-muted)'}}>
                            Streamline your logistics operations with real-time tracking, intelligent routing, and
                            comprehensive fleet management.
                        </p>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {FEATURES.map((f) => (
                            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description}/>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Right — Auth Card ── */}
            <div
                className="flex-1 flex items-center justify-center relative z-10 px-12"
                style={{backgroundColor: 'var(--login-bg)'}}
            >
                <div className="w-full max-w-md">

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {STATS.map((s) => (
                            <StatBadge key={s.label} value={s.value} label={s.label}/>
                        ))}
                    </div>

                    {/* Card */}
                    <div
                        className="w-full rounded-2xl shadow-2xl p-8"
                        style={{
                            backgroundColor: 'var(--login-bg)',
                            border: '1px solid rgba(255,255,255,0.05)',
                        }}
                    >
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-white text-2xl mb-2">Welcome Back</h2>
                            <p className="text-sm" style={{color: 'var(--login-text-muted)'}}>
                                Access your transport management dashboard
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-4 mb-8">
                            <TabButton label="Login" active={activeTab === 'login'}
                                       onClick={() => setActiveTab('request')}/>
                            <TabButton label="Request Access" active={activeTab === 'request'}
                                       onClick={() => setActiveTab('login')}/>
                        </div>

                        {/* Forms */}
                        {activeTab === 'request' && <LoginForm/>}
                        {activeTab === 'login' && <RequestAccessForm/>}

                        {/* Footer */}
                        <div className="mt-8 pt-6" style={{borderTop: '1px solid var(--login-divider)'}}>
                            <div className="flex items-center justify-between text-xs mb-3"
                                 style={{color: 'var(--login-text-dim)'}}>
                                <div className="flex items-center gap-2">
                                    <Shield className="w-3 h-3"/>
                                    <span>SSL Encrypted</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-3 h-3"/>
                                    <span>Version 2.4.1</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-xs mb-2" style={{color: 'var(--login-text-faint)'}}>
                                    Need help? Contact{' '}
                                    <a href="#" className="hover:underline" style={{color: 'var(--login-brand)'}}>
                                        support@vox.com
                                    </a>
                                </p>
                                <p className="text-xs" style={{color: 'var(--login-text-ghost)'}}>
                                    © 2026 VOX Team Cargo SRL. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}