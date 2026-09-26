import { cn } from "@/lib/utils";

interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Seconds per revolution */
  duration?: number;
  /** Orbit radius in px */
  radius?: number;
  reverse?: boolean;
  /** Show the orbit ring */
  path?: boolean;
  /** Diameter of each orbiting item in px */
  iconSize?: number;
  speed?: number;
  /**
   * Starting phase for the whole ring, in degrees. Items are still spread
   * evenly around the orbit — this just rotates where item 0 begins, so
   * stacking multiple rings doesn't line every ring's first icon up on the
   * same radial "spoke" at t=0. Give each ring a different value.
   */
  angleOffset?: number;
}

/**
 * Evenly distributes children around a circular orbit and rotates them.
 * Place inside a `relative` container; stack multiple instances with
 * different radii for multi-ring layouts.
 *
 * Requires the `orbit` keyframe + `.animate-orbit` utility in index.css.
 */
export function OrbitingCircles({
  className,
  children,
  duration = 20,
  radius = 160,
  reverse = false,
  path = true,
  iconSize = 32,
  speed = 1,
  angleOffset = 0,
  ...props
}: OrbitingCirclesProps) {
  const items = Array.isArray(children) ? children : [children];
  const calculatedDuration = duration / speed;

  return (
    <>
      {path && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="rounded-full border border-dashed border-border"
            style={{ width: radius * 2, height: radius * 2 }}
          />
        </div>
      )}
      {items.map((child, i) => {
        // even spacing around the ring, shifted by the ring's phase offset
        const angle = (360 / items.length) * i + angleOffset;
        return (
          <div
            key={i}
            data-slot="orbiting-circle"
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
              } as React.CSSProperties
            }
            className={cn(
              "animate-orbit absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform-gpu items-center justify-center rounded-full",
              reverse && "[animation-direction:reverse]",
              className
            )}
            {...props}
          >
            <div
              className="flex items-center justify-center"
              style={{ width: iconSize, height: iconSize }}
            >
              {child}
            </div>
          </div>
        );
      })}
    </>
  );
}