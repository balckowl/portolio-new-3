"use client"

import { SessionProvider as Provider } from "next-auth/react"
import { ReactNode } from "react"

export default function SessionProvider({ children }: { children: ReactNode }) {
    return (
        <div>
            <Provider>{children}</Provider>
        </div>
    )
}
