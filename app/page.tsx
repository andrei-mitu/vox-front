"use client"

import {useEffect} from "react"
import {useRouter} from "next/navigation"
import {Avatar, Box, Button, Flex, Text} from "@radix-ui/themes"
import {useAuthStore} from "@/store/authStore"
import {ROUTES} from "@/constants/routes"

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
    const router = useRouter()
    const {user, team, reset} = useAuthStore()

    // Guard — redirect to login if no session
    useEffect(() => {
        if (!user) router.replace(ROUTES.LOGIN)
    }, [user, router])

    const handleLogout = () => {
        reset()
        router.push(ROUTES.LOGIN)
    }

    if (!user) return null   // avoid flash before redirect

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            className="min-h-screen bg-primary gap-6"
        >
            <Box className="flex flex-col items-center gap-4 text-center max-w-sm">

                <Avatar
                    fallback={user.name.charAt(0).toUpperCase()}
                    size="5"
                    color="indigo"
                    radius="full"
                />

                <Box className="flex flex-col gap-1">
                    <Text size="5" weight="bold" className="text-text-primary">
                        {user.name}
                    </Text>
                    <Text size="2" className="text-text-secondary">
                        {user.email}
                    </Text>
                    {team && (
                        <Text size="2" className="text-accent-primary font-medium mt-1">
                            {team.name}
                        </Text>
                    )}
                </Box>

                <Text size="2" className="text-text-disabled">
                    Dashboard placeholder — your workspace goes here.
                </Text>

                <Button
                    variant="soft"
                    color="gray"
                    onClick={handleLogout}
                    className="cursor-pointer mt-2"
                >
                    Sign out
                </Button>

            </Box>
        </Flex>
    )
}