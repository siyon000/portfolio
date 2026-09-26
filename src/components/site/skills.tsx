import { Bug, Code2 } from "lucide-react";
import { OrbitingCircles } from "../ui/orbiting-circles";
import { Marquee } from "../ui/marquee";
import { Container, Reveal, SectionHeading } from "./primitives";
import { getTech, TechChip } from "@/lib/tech-icons";
import { kickers, skills } from "@/lib/site-data";
import { useTheme } from "@/lib/theme-context";

/* Ring geometry per group index (inner → outer). Reverse alternates so
   adjacent rings spin opposite ways. Both personas have 5 groups.
   Inner radius clears the ~64px hub (hub radius 32 + node radius 18 + gap),
   and the outer ring (2r + iconSize) stays inside the ~520px stage.
   Verified: inner nodes not covered, zero overflow.

   `offset` is the ring's starting phase (deg). Without it every ring puts its
   first icon at angle 0, so on load all five align into a radial "spoke" —
   these staggered values break that up and keep same-size rings interleaved. */
const RINGS = [
  { radius: 74, duration: 26, reverse: false, iconSize: 36, offset: 0 },
  { radius: 114, duration: 34, reverse: true, iconSize: 38, offset: 96 },
  { radius: 154, duration: 44, reverse: false, iconSize: 38, offset: 45 },
  { radius: 194, duration: 54, reverse: true, iconSize: 38, offset: 225 },
  { radius: 232, duration: 64, reverse: false, iconSize: 36, offset: 192 },
];

/* A single tool node on an orbit ring — a circle with the tool's icon. */
function OrbitNode({ name }: { name: string }) {
  const { Icon, label, color } = getTech(name);
  return (
    <div
      title={label}
      className="grid size-full place-items-center rounded-full border border-border bg-card shadow-sm"
    >
      <Icon
        className={color ? "size-[17px]" : "size-[17px] text-muted-foreground"}
        style={color ? { color } : undefined}
      />
    </div>
  );
}

export function Skills() {
  const { mode } = useTheme();
  const data = skills[mode];
  const groups = data.groups;
  const Hub = mode === "breach" ? Bug : Code2;

  return (
    <section id="skills" className="border-t border-border py-14 md:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            id="skills"
            title="Skills"
            kicker={kickers.skills}
            description={data.desc}
          />
        </Reveal>
      </Container>

      {/* ---------- mobile: scrolling marquees (orbit is too tight on phones) ---------- */}
      <div className="mt-8 flex flex-col gap-3 md:hidden">
        <Marquee pauseOnHover className="[--duration:38s] [--gap:0.5rem]">
          {data.marquee.map((n) => (
            <TechChip key={n} name={n} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:48s] [--gap:0.5rem]">
          {[...data.marquee].reverse().map((n) => (
            <TechChip key={n} name={n} />
          ))}
        </Marquee>

        {/* compact grouped legend under the marquee */}
        <Container>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {groups.map((group, i) => (
              <li key={group.label} className="border-l-2 border-border pl-4">
                <div className="flex items-center gap-2 font-mono text-[13px] text-primary">
                  <span className="text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {group.label}
                </div>
                <div className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {group.items.join(" · ")}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* ---------- desktop: orbit rings + legend ---------- */}
      <Container>
        <div className="mt-10 hidden grid-cols-1 items-center gap-10 md:grid lg:grid-cols-[1fr_0.8fr] lg:gap-6">
          {/* orbit stage */}
          <Reveal>
            <div className="relative mx-auto grid aspect-square w-full max-w-[540px] place-items-center">
              {/* central hub */}
              <div className="z-10 grid size-16 place-items-center rounded-2xl border border-border bg-card shadow-md">
                <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,var(--primary),transparent_70%)] opacity-15" />
                <Hub className="relative size-7 text-primary" />
              </div>

              {groups.map((group, i) => {
                const ring = RINGS[i % RINGS.length];
                return (
                  <OrbitingCircles
                    key={group.label}
                    radius={ring.radius}
                    duration={ring.duration}
                    reverse={ring.reverse}
                    iconSize={ring.iconSize}
                    angleOffset={ring.offset}
                  >
                    {group.items.map((item) => (
                      <OrbitNode key={item} name={item} />
                    ))}
                  </OrbitingCircles>
                );
              })}
            </div>
          </Reveal>

          {/* legend — which ring is which group + the tools in it */}
          <Reveal delay={0.1}>
            <ul className="flex flex-col gap-4">
              {groups.map((group, i) => (
                <li key={group.label} className="border-l-2 border-border pl-4">
                  <div className="flex items-center gap-2 font-mono text-[13px] text-primary">
                    <span className="text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {group.label}
                  </div>
                  <div className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {group.items.join(" · ")}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}