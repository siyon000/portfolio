import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggler } from "../ui/theme-toggler";
import { useTheme } from "@/lib/theme-context";
import { navLinks, profile } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { isDark, toggle, mode } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 md:px-8">
        <a href="#top" className="group flex items-baseline gap-1.5">
          <span className="font-signature text-2xl font-semibold leading-none tracking-normal">
            {profile.short}
          </span>
          <span
            aria-hidden
            className="font-mono text-primary transition-transform group-hover:translate-x-0.5"
          >
            {mode === "breach" ? "_" : "."}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="mr-1 hidden font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:inline">
            {mode}
          </span>
          <ThemeToggler isDark={isDark} onToggle={toggle} />

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-9 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="px-1 font-display text-base">
                {profile.short}
              </SheetTitle>
              <nav className="mt-6 flex flex-col gap-1 px-1">
                {navLinks.map((l) => (
                  <SheetClose asChild key={l.href}>
                    <a
                      href={l.href}
                      className="rounded-md px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}