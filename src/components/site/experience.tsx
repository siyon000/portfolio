import { ArrowUpRight } from "lucide-react";
import { Container, Reveal, SectionHeading } from "./primitives";
import { experience, kickers, type Experience as Exp } from "@/lib/site-data";

function Logo({ src, name }: { src?: string; name: string }) {
  if (src) {
    return (
      // frame clips the overflow so the logo can be zoomed inside its box
      <div className="size-11 shrink-0 overflow-hidden rounded-xl border border-border bg-card">
        <img
          src={src}
          alt={`${name} logo`}
          className="size-full scale-125 object-contain"
        />
      </div>
    );
  }
  const monogram = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-card font-display text-sm font-bold text-primary">
      {monogram}
    </div>
  );
}

function Company({ item }: { item: Exp }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
      <div className="flex items-center gap-3.5">
        <Logo src={item.logo} name={item.company} />
        <div className="min-w-0">
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-display text-lg font-semibold hover:text-primary"
            >
              {item.company}
              <ArrowUpRight className="size-4 opacity-70" />
            </a>
          ) : (
            <span className="font-display text-lg font-semibold">{item.company}</span>
          )}
          {item.location ? (
            <p className="text-sm text-muted-foreground">{item.location}</p>
          ) : null}
        </div>
      </div>

      {/* role progression — newest first */}
      <ol className="mt-5 ml-1 border-l border-border">
        {item.roles.map((r, i) => (
          <li key={r.title} className="relative ml-5 pb-5 last:pb-0">
            <span
              className={`absolute -left-[26px] top-1.5 size-2.5 rounded-full border-2 border-primary ${
                i === 0 ? "bg-primary" : "bg-background"
              }`}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <span className="font-medium">{r.title}</span>
              <span className="font-mono text-xs text-muted-foreground">{r.period}</span>
            </div>
            <span className="font-mono text-[12px] text-primary">{r.kind}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="border-t border-border py-14 md:py-20">
      <Container>
        <Reveal>
          <SectionHeading id="experience" title="Experience" kicker={kickers.experience} />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-2 grid grid-cols-1 gap-5">
            {experience.map((item) => (
              <Company key={item.company} item={item} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}