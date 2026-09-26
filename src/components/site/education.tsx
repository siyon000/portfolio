import { ArrowUpRight } from "lucide-react";
import { Container, Reveal, SectionHeading } from "./primitives";
import { education, kickers } from "@/lib/site-data";

export function Education() {
  return (
    <section id="education" className="border-t border-border py-14 md:py-20">
      <Container>
        <Reveal>
          <SectionHeading id="education" title="Education" kicker={kickers.education} />
        </Reveal>

        <Reveal delay={0.05}>
          <ol className="relative ml-1 mt-2 border-l border-border">
            {education.map((e) => (
              <li key={e.institution} className="relative ml-6 pb-8 last:pb-0">
                <span className="absolute -left-[31px] top-1 size-3 rounded-full border-2 border-primary bg-background" />
                <div className="font-mono text-xs text-muted-foreground">{e.period}</div>
                <h3 className="mt-1.5 text-lg font-semibold">{e.degree}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                  {e.url ? (
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                    >
                      {e.institution}
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  ) : (
                    <span className="font-medium text-foreground">{e.institution}</span>
                  )}
                  <span className="text-muted-foreground">· {e.location}</span>
                </div>
                {e.note ? (
                  <p className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-muted-foreground">
                    {e.note}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}