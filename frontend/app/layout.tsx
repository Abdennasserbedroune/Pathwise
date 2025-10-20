import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import type { ReactNode } from "react";

import { AuthActions } from "@/components/navigation/auth-actions";
import { ThemeToggle } from "@/components/navigation/theme-toggle"; // <CHANGE> add theme toggle
import { AuthSessionProvider } from "@/components/providers/session-provider";
import authOptions from "@/lib/auth/options";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pathwise",
  description: "AI-powered resume intelligence platform",
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {/* <CHANGE> initialize theme early to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(() => { try { const s = localStorage.getItem('theme'); const m = window.matchMedia('(prefers-color-scheme: dark)').matches; const t = s || (m ? 'dark' : 'light'); if (t === 'dark') document.documentElement.classList.add('dark'); } catch(e) {} })();",
          }}
        />
        <AuthSessionProvider session={session}>
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-[var(--border)] bg-[var(--background)]">
              <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4">
                <div className="flex flex-wrap items-center gap-6">
                  <span className="text-lg font-semibold tracking-tight">Pathwise</span>
                  <nav className="flex items-center gap-6 text-sm text-[var(--muted)]">
                    <a className="transition hover:text-[var(--brand)]" href="#features">
                      Features
                    </a>
                    <a className="transition hover:text-[var(--brand)]" href="#workflow">
                      Workflow
                    </a>
                    <a className="transition hover:text-[var(--brand)]" href="#stack">
                      Stack
                    </a>
                  </nav>
                </div>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <AuthActions session={session} />
                </div>
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-[var(--border)] bg-[var(--background)] py-6">
              <div className="container mx-auto px-6 text-sm text-[var(--muted)]">
                © {new Date().getFullYear()} Pathwise. All rights reserved.
              </div>
            </footer>
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
