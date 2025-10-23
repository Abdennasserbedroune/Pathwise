import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-[var(--background)]">
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-[var(--foreground)] md:text-6xl">
            Swipe Your Way to Your{" "}
            <span className="text-[var(--brand)]">Dream Job</span>
          </h1>
          <p className="mb-8 text-pretty text-lg leading-relaxed text-[var(--muted)] md:text-xl">
            Discover your perfect job match with our intuitive swipe-based job browser. Swipe
            right on opportunities you love, left on those you don&apos;t. It&apos;s that simple.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/jobs"
              className="rounded-lg bg-[var(--brand)] px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-[var(--brand-hover)] active:scale-95"
            >
              Start Swiping
            </Link>
            <Link
              href="/signin"
              className="rounded-lg border-2 border-[var(--border)] bg-transparent px-8 py-4 font-semibold text-[var(--foreground)] transition hover:bg-[var(--card)]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--card)] py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-[var(--foreground)] md:text-4xl">
            How It Works
          </h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand)] text-3xl text-white">
                  1
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">Browse Jobs</h3>
              <p className="leading-relaxed text-[var(--muted)]">
                Scroll through curated job opportunities tailored to your profile and preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand)] text-3xl text-white">
                  2
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
                Swipe Right or Left
              </h3>
              <p className="leading-relaxed text-[var(--muted)]">
                Swipe right on jobs you&apos;re interested in, left on those that don&apos;t fit.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand)] text-3xl text-white">
                  3
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">Get Matched</h3>
              <p className="leading-relaxed text-[var(--muted)]">
                When you like a job, we&apos;ll notify the employer and help you connect.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-[var(--foreground)] md:text-4xl">
            Why AutoJobFlow?
          </h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="mb-3 text-xl font-semibold text-[var(--foreground)]">
                ⚡ Fast & Intuitive
              </h3>
              <p className="leading-relaxed text-[var(--muted)]">
                No more endless scrolling through job listings. Our swipe interface makes job
                hunting quick and enjoyable.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="mb-3 text-xl font-semibold text-[var(--foreground)]">
                🎯 Personalized Matches
              </h3>
              <p className="leading-relaxed text-[var(--muted)]">
                Our algorithm learns from your swipes to show you more relevant opportunities over
                time.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="mb-3 text-xl font-semibold text-[var(--foreground)]">
                📱 Mobile-First Design
              </h3>
              <p className="leading-relaxed text-[var(--muted)]">
                Browse jobs anywhere, anytime. Our platform is optimized for mobile devices so you
                can job hunt on the go.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="mb-3 text-xl font-semibold text-[var(--foreground)]">
                💼 Quality Opportunities
              </h3>
              <p className="leading-relaxed text-[var(--muted)]">
                We partner with top companies to bring you genuine, high-quality job opportunities
                across all industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--brand)] py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Find Your Dream Job?</h2>
          <p className="mb-8 text-lg text-white/90">
            Join thousands of job seekers who have found their perfect match.
          </p>
          <Link
            href="/jobs"
            className="inline-block rounded-lg bg-white px-8 py-4 font-semibold text-[var(--brand)] shadow-lg transition hover:bg-gray-100 active:scale-95"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
