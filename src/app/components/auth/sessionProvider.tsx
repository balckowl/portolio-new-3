"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider as Provider } from "next-auth/react"
import { ReactNode } from "react"

export default function SessionProvider({ children }: { children: ReactNode }) {
    return (
        <div>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Provider>{children}</Provider>
            </ThemeProvider>
        </div>
    )
}
