import "./globals.css";

import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Sora } from "next/font/google";
import { getServerSession } from "next-auth";
import type { ReactNode } from "react";

import { AuthActions } from "@/components/navigation/auth-actions";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import authOptions from "@/lib/auth/options";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "AutoJobFlow - Swipe Your Way to Your Dream Job",
  description:
    "Discover your perfect job match with our intuitive swipe-based job browser. Swipe right on opportunities you love, left on those you don't.",
  keywords: ["job search", "job board", "career", "swipe jobs", "job matching"],
  openGraph: {
    title: "AutoJobFlow - Swipe Your Way to Your Dream Job",
    description: "Discover your perfect job match with our intuitive swipe-based job browser.",
    type: "website",
  },
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sora.variable}`}>
      <body className="bg-background font-sans text-foreground antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(() => { try { const stored = localStorage.getItem('theme'); const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; const theme = stored || (prefersDark ? 'dark' : 'light'); if (theme === 'dark') document.documentElement.classList.add('dark'); } catch (_) {} })();",
          }}
        />
        <AuthSessionProvider session={session}>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
              <div className="container flex h-16 items-center justify-between gap-6 px-4">
                <Link href="/" className="font-display text-lg font-semibold tracking-tight text-foreground">
                  AutoJobFlow
                </Link>
                <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
                  <Link className="transition hover:text-foreground" href="/landing">
                    Platform
                  </Link>
                  <Link className="transition hover:text-foreground" href="/landing#how-it-works">
                    How it works
                  </Link>
                  <Link className="transition hover:text-foreground" href="/landing#for-teams">
                    For teams
                  </Link>
                </nav>
                <div className="flex items-center gap-3">
                  <Link
                    href="/jobs"
                    className="hidden rounded-lg border border-border/70 bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-foreground hover:bg-surface-elevated/80 md:inline-flex"
                  >
                    Browse jobs
                  </Link>
                  <ThemeToggle />
                  <AuthActions session={session} />
                </div>
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-border/70 bg-background/90 py-6">
              <div className="container flex flex-col gap-2 px-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
                <span>© {new Date().getFullYear()} AutoJobFlow. Designed for ambitious job seekers.</span>
                <div className="flex gap-4">
                  <Link className="transition hover:text-foreground" href="/privacy">
                    Privacy
                  </Link>
                  <Link className="transition hover:text-foreground" href="/terms">
                    Terms
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
