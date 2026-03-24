"use client"

import {useEffect} from "react"
import {useRouter} from "next/navigation"
import {Flex} from "@radix-ui/themes"
import {useAuthStore} from "@/store/authStore"
import {ROUTES} from "@/constants/routes"

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
    const router = useRouter()
    const {user} = useAuthStore()

    // Guard — redirect to login if no session
    useEffect(() => {
        if (!user) router.replace(ROUTES.LOGIN)
    }, [user, router])
    if (!user) return null

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
        >
        </Flex>
    )
}