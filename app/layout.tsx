import "./globals.css"
import { Theme } from '@radix-ui/themes';

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
        <body>
        <Theme>
            {children}
        </Theme>
        </body>
        </html>
    );
}