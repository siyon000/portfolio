import { BadgeCheck, ExternalLink, ShieldCheck } from "lucide-react";
import { Container, Reveal, SectionHeading } from "./primitives";
import { certifications, kickers, type Certification } from "@/lib/site-data";

/* Rotating conic seal stamped with the credential's short code. */
function Seal({ short }: { short: string }) {
  return (
    <div className="relative grid size-14 place-items-center rounded-full">
      {/* rotating conic ring — promoted to its own GPU layer so it doesn't
          get re-rasterized on every scroll frame */}
      <div
        className="animate-spin-slow absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--beam-from),var(--beam-to),var(--beam-from))] [backface-visibility:hidden] [transform:translateZ(0)] will-change-transform"
      />
      {/* inner disc */}
      <div className="absolute inset-[2.5px] rounded-full bg-card" />
      <span className="relative bg-[linear-gradient(135deg,var(--beam-from),var(--beam-to))] bg-clip-text font-display text-[13px] font-bold tracking-tight text-transparent">
        {short}
      </span>
    </div>
  );
}

function CertCard({ cert }: { cert: Certification }) {
  return (
    <a
      href={cert.verify}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full rounded-2xl [content-visibility:auto] [contain-intrinsic-size:1px_360px]"
    >
      {/* gradient glow border — box-shadow instead of a blurred layer that
          the browser has to keep composited even at opacity-0 */}
      <div className="absolute -inset-px rounded-2xl bg-[linear-gradient(135deg,var(--beam-from),var(--beam-to))] opacity-0 shadow-[0_0_18px_2px_var(--beam-to)] transition-opacity duration-300 group-hover:opacity-60" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-transform duration-300 [transform:translateZ(0)] group-hover:-translate-y-1">
        {/* ---- certificate preview ---- */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-muted/60 to-card">
          {cert.image ? (
            <img
              src={cert.image}
              alt={`${cert.title} certificate`}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="grid size-full place-items-center">
              <ShieldCheck className="size-10 text-muted-foreground/30" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/45 via-transparent to-card/10" />

          {cert.date ? (
            <span className="absolute right-3 top-3 rounded-full border border-border/60 bg-card/70 px-2.5 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur">
              {cert.date}
            </span>
          ) : null}
        </div>

        {/* ---- body ---- */}
        <div className="relative flex flex-1 flex-col px-5 pb-5">
          <div className="-mt-7 mb-3 w-fit rounded-full bg-card p-1 shadow-lg">
            <Seal short={cert.short} />
          </div>

          <h3 className="text-[15px] font-semibold leading-snug">{cert.title}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{cert.issuer}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {cert.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
            <BadgeCheck className="size-4" /> Verify credential
            <ExternalLink className="size-3 opacity-60 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="border-t border-border py-14 md:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            id="certifications"
            title="Certifications"
            kicker={kickers.certs}
            description={`Credentials with links to their original verification sources.`}
          />
        </Reveal>

        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.short} delay={Math.min(i * 0.05, 0.25)}>
              <CertCard cert={cert} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}