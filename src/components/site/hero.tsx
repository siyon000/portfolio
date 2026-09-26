import { createRef, useMemo, useRef, type RefObject } from "react";
import { motion } from "motion/react";
import { TypeAnimation } from "react-type-animation";
import { ArrowUpRight, Bug, Code2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { useTheme } from "@/lib/theme-context";
import { getTech } from "@/lib/tech-icons";
import { about, persona, profile } from "@/lib/site-data";

/* -------------------------------------------------------------------------- */
/*  Tech constellation — six tool nodes wired to a central hub with           */
/*  animated gradient beams. Rebuilds itself when the persona changes.        */
/* -------------------------------------------------------------------------- */
function Node({
  name,
  nodeRef,
}: {
  name: string;
  nodeRef: RefObject<HTMLDivElement | null>;
}) {
  const { Icon, color } = getTech(name);
  return (
    <div
      ref={nodeRef}
      title={name}
      className="z-10 grid size-11 place-items-center rounded-xl border border-border bg-card text-foreground shadow-sm sm:size-12"
    >
      <Icon className="size-5 sm:size-[22px]" style={color ? { color } : undefined} />
    </div>
  );
}

function TechBeams() {
  const { mode } = useTheme();
  const data = persona[mode];
  const nodes = data.beamNodes;

  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  // stable refs, rebuilt per persona so beams recompute cleanly
  const refs = useMemo(
    () => nodes.map(() => createRef<HTMLDivElement>()),
    [mode], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const left = nodes.slice(0, 3);
  const right = nodes.slice(3, 6);
  const from = mode === "breach" ? "#f2d27a" : "#5b8cff";
  const to = mode === "breach" ? "#c99329" : "#22d3ee";
  const curves = [46, 0, -46]; // top / middle / bottom fan

  const Hub = mode === "breach" ? Bug : Code2;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex h-[340px] w-full max-w-md items-center justify-between px-2 sm:h-[420px]"
    >
      <div className="flex flex-col justify-center gap-9 sm:gap-12">
        {left.map((n, i) => (
          <Node key={mode + n} name={n} nodeRef={refs[i]} />
        ))}
      </div>

      <div
        ref={hubRef}
        className="z-10 grid size-16 place-items-center rounded-2xl border border-border bg-card shadow-md sm:size-[72px]"
      >
        <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,var(--primary),transparent_70%)] opacity-15" />
        <Hub className="relative size-7 text-primary sm:size-8" />
      </div>

      <div className="flex flex-col justify-center gap-9 sm:gap-12">
        {right.map((n, i) => (
          <Node key={mode + n} name={n} nodeRef={refs[i + 3]} />
        ))}
      </div>

      {/* beams: left nodes flow inward, right nodes reversed */}
      {left.map((_, i) => (
        <AnimatedBeam
          key={`l${mode}${i}`}
          containerRef={containerRef}
          fromRef={refs[i]}
          toRef={hubRef}
          curvature={curves[i]}
          duration={4 + i * 0.5}
          delay={i * 0.4}
          gradientStartColor={from}
          gradientStopColor={to}
          pathOpacity={0.12}
        />
      ))}
      {right.map((_, i) => (
        <AnimatedBeam
          key={`r${mode}${i}`}
          containerRef={containerRef}
          fromRef={refs[i + 3]}
          toRef={hubRef}
          curvature={curves[i]}
          duration={4 + i * 0.5}
          delay={i * 0.4 + 0.25}
          reverse
          gradientStartColor={from}
          gradientStopColor={to}
          pathOpacity={0.12}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */
export function Hero() {
  const { mode } = useTheme();
  const data = persona[mode];
  const intro = about[mode];
  const hasQuote = intro.quote.trim().length > 0;

  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-14 md:grid-cols-[1.05fr_0.95fr] md:gap-14 md:px-8 md:pb-24 md:pt-20">
        {/* left */}
        <div>
          <motion.span
            key={data.kicker}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-sm text-primary"
          >
            {data.kicker}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-[clamp(2.9rem,8vw,4.75rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          >
            {profile.name}
          </motion.h1>

          {/* role line — the leading "/" decoration has been removed */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4 font-mono text-lg text-muted-foreground md:text-xl"
          >
            <TypeAnimation
              key={mode}
              sequence={data.roles.flatMap((r) => [r, 1700])}
              wrapper="span"
              speed={45}
              repeat={Infinity}
              cursor
              className="text-foreground"
            />
          </motion.div>

          {/* quote block only renders when there's actually a quote */}
          {hasQuote ? (
            <motion.blockquote
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-6 max-w-[42ch] font-display text-[clamp(1.15rem,2.2vw,1.5rem)] font-medium leading-snug tracking-tight text-foreground"
            >
              <span className="text-primary">“</span>
              {intro.quote}
              <span className="text-primary">”</span>
            </motion.blockquote>
          ) : null}

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className={`${hasQuote ? "mt-3" : "mt-6"} max-w-[50ch] text-[15px] leading-relaxed text-muted-foreground`}
          >
            {intro.doing}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-6 flex flex-wrap items-center gap-2.5 font-mono text-[13px] text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {data.status}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
              <MapPin className="size-3.5" />
              {profile.location}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <a href="#contact">
                Get in touch <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#skills">{mode === "breach" ? "See the arsenal" : "See the stack"}</a>
            </Button>
          </motion.div>
        </div>

        {/* right — animated tech constellation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <TechBeams />
        </motion.div>
      </div>
    </section>
  );
}