"use client"

import Image from "next/image"
import {Box, Flex, Text} from "@radix-ui/themes"

export function MobileHeader() {
    return (
        <Flex className="flex flex-col items-center p-4 bg-primary lg:hidden">
            <Box>
                <Image src="/logo-light.svg" alt="VOX Team Cargo" width={100} height={32} priority />
            </Box>
            <Box className="flex flex-col gap-4 max-w-sm text-center">
                <Text size="8" weight="bold" className="text-text-primary leading-tight tracking-tight">
                    VOX Team Cargo
                </Text>
                <Text size="4" className="text-text-secondary leading-relaxed">
                    Move goods. <span className="text-accent-primary font-medium">Not paperwork.</span>
                </Text>
            </Box>
        </Flex>
    )
}
