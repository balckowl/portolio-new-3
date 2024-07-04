import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SessionProvider from "../app/components/auth/sessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portolio",
  description: "ポートリオは失敗談や挫折談を投稿するポートフォリオです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <SessionProvider>
        <body className={inter.className}>
          <div className="min-h-[calc(100vh-55px-55px)]">{children}</div>
        </body>
      </SessionProvider>
    </html >
  );
}
