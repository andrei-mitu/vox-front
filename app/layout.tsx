import "./globals.css"
import {THEME_SCRIPT} from "@/lib/theme"
import {ThemeProvider} from "@/components/ThemeProvider";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <script dangerouslySetInnerHTML={{__html: THEME_SCRIPT}}/>
        </head>
        <body>
        <ThemeProvider>
            {children}
        </ThemeProvider>
        </body>
        </html>
    )
}