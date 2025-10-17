import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import type { ReactNode } from "react";

import { AuthActions } from "@/components/navigation/auth-actions";
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
    <html lang="en" className="bg-slate-950">
      <body className={`${inter.className} text-slate-100`}>
        <AuthSessionProvider session={session}>
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-slate-800 bg-slate-900">
              <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4">
                <div className="flex flex-wrap items-center gap-6">
                  <span className="text-lg font-semibold tracking-tight">Pathwise</span>
                  <nav className="flex items-center gap-6 text-sm text-slate-300">
                    <a className="transition hover:text-cyan-300" href="#features">
                      Features
                    </a>
                    <a className="transition hover:text-cyan-300" href="#workflow">
                      Workflow
                    </a>
                    <a className="transition hover:text-cyan-300" href="#stack">
                      Stack
                    </a>
                  </nav>
                </div>
                <AuthActions session={session} />
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-slate-800 bg-slate-950 py-6">
              <div className="container mx-auto px-6 text-sm text-slate-400">
                © {new Date().getFullYear()} Pathwise. All rights reserved.
              </div>
            </footer>
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
