"use client"

import Image from "next/image"
import {Box, Text} from "@radix-ui/themes"

export function OverlayBlock() {
    return (
        <Box className="transparent-block absolute left-8 top-1/2 transform -translate-y-1/2">
            <Box className="flex items-center gap-2 mb-4">
                <Image src="/logo-light.svg" alt="VOX" width={40} height={12} priority />
                <Text size="5" weight="bold">VOX Team Cargo</Text>
            </Box>
            <Text size="2" className="text-text-primary">
                Your trusted logistics partner.
            </Text>
        </Box>
    )
}
