"use client"

import {Truck, Package, MapPin} from "lucide-react"

export function BackgroundDecor() {
    return (
        <>
            {/* subtle grid */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `
            linear-gradient(to right, rgba(117,190,191,.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(117,190,191,.15) 1px, transparent 1px)
          `,
                backgroundSize: "40px 40px",
            }} />
            {/* floating icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <Truck className="absolute top-20 left-[15%] text-(--accent-primary) opacity-[.04] w-32 h-32 rotate-12" />
                <Package className="absolute bottom-32 left-[10%] text-accent-primary opacity-[.04] w-24 h-24 -rotate-12" />
                <MapPin className="absolute top-[40%] left-[5%] text-accent-primary opacity-[.04] w-20 h-20" />
            </div>
        </>
    );
}
