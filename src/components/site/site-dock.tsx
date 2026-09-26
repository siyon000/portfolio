import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import {
  Home,
  Code2,
  Bug,
  Briefcase,
  Award,
  GraduationCap,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

type Only = "build" | "breach";
const NAV: { href: string; label: string; icon: LucideIcon; only?: Only }[] = [
  { href: "#top", label: "Home", icon: Home },
  { href: "#experience", label: "Experience", icon: Briefcase, only: "build" },
  { href: "#skills", label: "Skills", icon: Code2 },
  { href: "#certifications", label: "Certifications", icon: Award, only: "breach" },
  { href: "#education", label: "Education", icon: GraduationCap },
  { href: "#contact", label: "Contact", icon: Mail },
];

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

/** Hide while the page is actively scrolling; reveal once it stops (idle ms). */
function useVisibleWhenIdle(idle = 250) {
  const [visible, setVisible] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(false);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setVisible(true), idle);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [idle]);

  return visible;
}

export function SiteDock() {
  const { isDark, mode, toggle } = useTheme();
  const isMobile = useIsMobile();
  const visible = useVisibleWhenIdle();

  // compact on phones (no hover magnify on touch), roomy on desktop
  const baseSize = isMobile ? 34 : 44;
  const magnification = isMobile ? 34 : 64;

  const items = NAV.filter((n) => !n.only || n.only === mode).map((n) =>
    n.href === "#skills" ? { ...n, icon: mode === "breach" ? Bug : Code2 } : n,
  );

  // toggle mark: bug points to Security, code points back to Developer
  const ToggleIcon = isDark ? Code2 : Bug;
  const toggleLabel = isDark ? "Switch to Developer" : "Switch to Security";

  // persona flip — circular "wipe" reveal via the View Transitions API,
  // expanding outward from the button's click position
  const flip = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!document.startViewTransition || reduced) {
        toggle();
        return;
      }

      const { clientX: x, clientY: y } = e;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      const transition = document.startViewTransition(() => toggle());

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 550,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      });
    },
    [toggle],
  );

  const iconClass = "rounded-2xl bg-transparent hover:bg-muted";

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-3 z-50 flex justify-center px-3 transition-all duration-300 ease-out sm:bottom-4 motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-[140%] opacity-0",
      )}
    >
      <Dock
        baseSize={baseSize}
        magnification={magnification}
        distance={150}
        className={cn(
          "h-14 gap-1.5 rounded-3xl px-2 shadow-2xl sm:h-16 sm:gap-2 sm:px-3",
          visible ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        {items.map((n) => (
          <a
            key={n.href}
            href={n.href}
            title={n.label}
            aria-label={n.label}
            className="inline-flex items-end"
          >
            <DockIcon label={n.label} className={iconClass}>
              <n.icon className="size-[18px]" />
            </DockIcon>
          </a>
        ))}

        <span className="mx-0.5 my-2 w-px self-stretch bg-border" />

        <button
          type="button"
          onClick={flip}
          title={toggleLabel}
          aria-label={toggleLabel}
          className="inline-flex items-end"
        >
          <DockIcon className={cn("rounded-2xl bg-primary/15 text-primary hover:bg-primary/25 hover:text-primary")}>
            <ToggleIcon className="size-[18px]" />
          </DockIcon>
        </button>
      </Dock>
    </div>
  );
}