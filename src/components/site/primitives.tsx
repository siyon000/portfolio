import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-6 md:px-8", className)}>
      {children}
    </div>
  );
}

/** One gentle reveal on first view — deliberately quiet, not on every child. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  id,
  title,
  kicker,
  description,
}: {
  id: string;
  title: string;
  /** { build, breach } mono label */
  kicker: { build: string; breach: string };
  description?: string;
}) {
  const { mode } = useTheme();
  return (
    <div className="mb-12 md:mb-16">
      <span className="font-mono text-[13px] text-primary" id={`${id}-kicker`}>
        {mode === "breach" ? "~/" : "./"}
        {kicker[mode]}
      </span>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}