"use client"

import {useState} from "react"
import {Box, Flex, Text} from "@radix-ui/themes"
import {tw} from "@/lib/tw"
import {TabButton} from "@/components/ui/TabButton"
import {LoginForm} from "@/components/ui/LoginForm"
import {RequestAccessForm as SignUpForm} from "@/components/ui/RequestAccessForm"

export function AuthContainer() {
    const [activeTab, setActiveTab] = useState<'login' | 'sign-up'>('login')

    return (
        <Flex
            align="center"
            justify="center"
            className="relative w-full lg:flex-1 min-h-screen"
        >
            {/* Grid background layer */}
            <Box className="absolute inset-0 bg-primary z-0" />
            {/* Card */}
            <Box className="relative z-10 bg-secondary w-full max-w-sm p-6 rounded-lg shadow-md">
                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <TabButton
                        label="Login"
                        active={activeTab === 'login'}
                        onClick={() => setActiveTab('login')}
                    />
                    <TabButton
                        label="Sign up"
                        active={activeTab === 'sign-up'}
                        onClick={() => setActiveTab('sign-up')}
                    />
                </div>
                {/* Forms with fade transition */}
                <div className="relative h-[auto] min-h-[200px]">
                    <div
                        className={tw(
                            "absolute inset-0 transition-opacity duration-300",
                            activeTab === 'login' ? "opacity-100" : "opacity-0 pointer-events-none"
                        )}
                    >
                        <LoginForm />
                    </div>
                    <div
                        className={tw(
                            "absolute inset-0 transition-opacity duration-300",
                            activeTab === 'sign-up' ? "opacity-100" : "opacity-0 pointer-events-none"
                        )}
                    >
                        <SignUpForm />
                    </div>
                </div>
            </Box>
        </Flex>
    )
}
