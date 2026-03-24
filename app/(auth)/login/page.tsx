'use client';

import './login.css';
import {useState} from 'react';
import {LoginForm} from "@/components/ui/auth/LoginForm";
import {FeatureCard} from '@/components/ui/card/FeatureCard';
import {RequestAccessForm} from "@/components/ui/auth/RequestAccessForm";
import {Clock, MapPin, Package, Shield, TrendingUp, Truck} from 'lucide-react';
import {TabButton} from "@/components/ui/button/TabButton";

// ─── Static data ──────────────────────────────────────────────────────────────

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

type Tab = 'login' | 'request' | 'referral';

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState<Tab>('login');

    return (
        <div className="login-root">

            {/* Grid background */}
            <div className="login-grid bg-grid" aria-hidden="true"/>

            {/* Floating icon decorations */}
            <div className="login-icons" aria-hidden="true">
                <Truck className="icon-truck"/>
                <Package className="icon-package"/>
                <MapPin className="icon-mappin"/>
            </div>

            {/* ── Left — Branding ── */}
            <section className="login-left">
                <div className="login-left__inner">

                    {/* Logo */}
                    <div className="login-logo">
                        <div className="login-logo__icon-wrap">
                            <Truck aria-hidden="true"/>
                        </div>
                        <span className="login-logo__wordmark">VOX</span>
                    </div>

                    <p className="login-tagline">Transport Management System</p>
                    <p className="login-description">
                        Streamline your logistics operations with real-time tracking,
                        intelligent routing, and comprehensive fleet management.
                    </p>

                    {/* Feature cards */}
                    <div className="login-features">
                        {FEATURES.map(({icon, title, description}) => (
                            <FeatureCard
                                key={title}
                                icon={icon}
                                title={title}
                                description={description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Right — Auth panel ── */}
            <section className="login-right">
                <div className="login-right__inner">

                    {/* Stats */}
                    <div className="login-stats" aria-label="Platform statistics">
                        {STATS.map(({value, label}) => (
                            <div key={label} className="login-stat">
                                <div className="login-stat__value">{value}</div>
                                <div className="login-stat__label">{label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Card */}
                    <div className="login-card">
                        <h2 className="login-card__title">Welcome Back</h2>
                        <p className="login-card__subtitle">
                            Access your transport management dashboard
                        </p>

                        {/* Tab switcher */}
                        <div className="login-tabs" role="tablist">
                            {(['login', 'request', 'referral'] as const).map((tab) => (
                                <TabButton
                                    key={tab}
                                    label={tab}
                                    active={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                />
                            ))}
                        </div>

                        {/* Forms */}
                        {activeTab === 'login' && <LoginForm/>}
                        {activeTab === 'referral' && <LoginForm/>}
                        {activeTab === 'request' && <RequestAccessForm/>}

                        {/* Footer */}
                        <div className="login-footer">
                            <div className="login-footer__meta">
                                <span>
                                    <Shield aria-hidden="true"/>
                                    SSL Encrypted
                                </span>
                                <span>
                                    <Clock aria-hidden="true"/>
                                    Version 2.4.1
                                </span>
                            </div>
                            <p className="login-footer__help">
                                Need help?{' '}
                                <a href="mailto:support@vox-tms.com">support@vox-tms.com</a>
                            </p>
                            <p className="login-footer__copy">
                                © 2026 VOX Transport Management System. All rights reserved.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}