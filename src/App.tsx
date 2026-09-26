import { useEffect, useState } from "react";
import Lenis from "lenis";
import type { SVGProps } from "react";
import { ThemeProvider, useTheme } from "@/lib/theme-context";
import { Hero } from "@/components/site/hero";
import { Experience } from "./components/site/experience";
import { Skills } from "@/components/site/skills";
import { Education } from "@/components/site/education";
import { Certifications } from "@/components/site/certifications";
import { Contact } from "@/components/site/contact";
import { SiteDock } from "@/components/site/site-dock";
import SlingButton from "./components/SlingButton";
import { ArrowUp, Mail } from "lucide-react";
import { profile } from "@/lib/site-data";

const HEADER_OFFSET = 24; // no sticky navbar — just breathing room

/** Smoothly scroll to the very top of the page (respects reduced motion). */
function scrollToTop() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}

/* Resolve theme CSS variables to concrete color strings. SlingButton draws its
   particles on a <canvas>, and canvas fillStyle can't read `var(--x)` — it needs
   real values. Re-resolves whenever the persona (light/dark tokens) changes. */
type ThemeColors = { card: string; primary: string; muted: string; border: string };
function readThemeColors(): ThemeColors {
  const fallback: ThemeColors = {
    card: "#12151d",
    primary: "#5b8cff",
    muted: "#171b24",
    border: "#1e2431",
  };
  if (typeof window === "undefined") return fallback;
  const s = getComputedStyle(document.documentElement);
  const g = (v: string, fb: string) => s.getPropertyValue(v).trim() || fb;
  return {
    card: g("--card", fallback.card),
    primary: g("--primary", fallback.primary),
    muted: g("--muted", fallback.muted),
    border: g("--border", fallback.border),
  };
}
function useThemeColors(): ThemeColors {
  const { mode } = useTheme();
  const [colors, setColors] = useState<ThemeColors>(readThemeColors);
  useEffect(() => {
    // read on the next frame so the .dark class / CSS vars have applied
    const id = requestAnimationFrame(() => setColors(readThemeColors()));
    return () => cancelAnimationFrame(id);
  }, [mode]);
  return colors;
}

/** Lenis smooth scrolling + smooth in-page anchor jumps (respects reduced motion). */
function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: true,       // smooth the native touch scroll on mobile (was off by default)
      syncTouchLerp: 0.08,   // lower = heavier/smoother glide; raise toward 0.1–0.15 if it feels laggy
      touchMultiplier: 1.5,  // how far one swipe travels; tune to taste
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = hash === "#top" ? document.body : document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: hash === "#top" ? 0 : -HEADER_OFFSET });
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}
/* Inline brand marks — build-safe regardless of lucide version. */
type IconProps = SVGProps<SVGSVGElement>;
function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}
function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

const FOOTER_NAV = [
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

function Footer() {
  const { mode } = useTheme();
  const c = useThemeColors();
  const year = new Date().getFullYear();

  const socials = [
    { key: "github", href: profile.socials.github, label: "GitHub", Icon: GithubIcon },
    { key: "linkedin", href: profile.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { key: "email", href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ].filter((s) => s.href && !s.href.endsWith("//github.com/")); // drop unfilled github placeholder

  return (
    <footer className="border-t border-border pb-28 pt-12">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* left — identity */}
          <div className="max-w-xs">
            <a href="#top" className="font-display text-lg font-bold tracking-tight">
              {profile.name}
            </a>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              {mode === "breach"
                ? "Security enthusiast focused on web, network, and cloud security."
                : "Full-stack & React Native developer — web and mobile, end to end."}
            </p>
          </div>

          {/* middle — quick nav */}
          <nav className="flex flex-col gap-2.5 font-mono text-[13px]">
            {FOOTER_NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* right — socials + slingshot back-to-top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {socials.map(({ key, href, label, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  title={label}
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>

            {/* slingshot — fling it up to jump back to top */}
            <div title="Back to top" aria-label="Back to top">
              <SlingButton
                onSend={scrollToTop}
                padColor={c.card}
                iconColor={c.primary}
                accentColor={c.primary}
                wellColor={c.muted}
                bandColor={c.border}
                size={44}
                strokeWidth={3}
                armAt={48}
                maxPull={160}
                launchSpeed={2600}
                recoil={0.2}
                flight={120}
                particles={14}
                spread={60}
                axis="any"
                tapSends
                disabled={false}
              />
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 font-mono text-[12px] text-muted-foreground sm:flex-row sm:items-center">
          <span>© {year} {profile.name}. All rights reserved.</span>
          {/* <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 transition-colors hover:text-primary"
          >
            <ArrowUp className="size-3.5" />
          </button> */}
        </div>
      </div>
    </footer>
  );
}

function Site() {
  const { mode } = useTheme();
  useSmoothScroll();
  return (
    <div className="min-h-screen text-foreground">
      <main>
        <Hero />
        {/* experience belongs to the developer persona */}
        {mode === "build" && <Experience />}
        <Skills />
        {/* certifications belong to the security persona */}
        {mode === "breach" && <Certifications />}
        <Education />
        <Contact />
      </main>
      <Footer />
      <SiteDock />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Site />
    </ThemeProvider>
  );
}