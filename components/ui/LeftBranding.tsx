"use client"

import Image from "next/image"
import {Box, Flex, Text} from "@radix-ui/themes"

export function LeftBranding() {
    return (
        <Flex
            className="hidden lg:flex lg:w-96 bg-primary p-12 relative overflow-hidden flex flex-col items-center justify-between gap-8"
        >
            {/* Logo */}
            <Box>
                <Image src="/images/logo-light.png" alt="VOX Team Cargo" width={120} height={40} priority />
            </Box>

            {/* Hero copy */}
            <Box className="flex flex-col gap-4 max-w-sm">
                <Text size="8" weight="bold" className="text-text-primary leading-tight tracking-tight">
                    VOX Team Cargo
                </Text>
                <Text size="4" className="text-text-secondary leading-relaxed">
                    Move goods. <span className="text-accent-primary font-medium">Not paperwork.</span>
                </Text>
            </Box>

            {/* Bottom note */}
            <Text size="1" className="text-text-disabled">
                © {new Date().getFullYear()} VOX Team Cargo. All rights reserved.
            </Text>

            {/* Decorative accent circle */}
            <Box className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-10" style={{background: "var(--accent-primary)"}} />
        </Flex>
    )
}
