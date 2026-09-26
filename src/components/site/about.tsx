import { Container, Reveal } from "./primitives";
import { about, kickers } from "@/lib/site-data";
import { useTheme } from "@/lib/theme-context";

export function About() {
  const { mode } = useTheme();
  const data = about[mode];

  return (
    <section id="about" className="border-t border-border py-14 md:py-20">
      <Container>
        <Reveal>
          <div className="font-mono text-sm text-primary">{kickers.about[mode]}</div>

          <blockquote className="mt-5 max-w-3xl font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-medium leading-[1.2] tracking-tight">
            <span className="text-primary">“</span>
            {data.line}
            <span className="text-primary">”</span>
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}