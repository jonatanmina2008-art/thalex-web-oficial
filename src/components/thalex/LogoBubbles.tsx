import { motion } from "motion/react";
import { STREAMING_NETWORK } from "@/lib/thalex-data";

/**
 * Floating logo bubbles for the page background.
 * Renders soft, low-opacity logo discs drifting across the viewport.
 */
export function LogoBubbles() {
  // Distribute logos in a pseudo-random but stable pattern.
  const bubbles = STREAMING_NETWORK.map((s, i) => {
    const left = (i * 37 + 7) % 95; // 0..95
    const top = (i * 53 + 13) % 90; // 0..90
    const size = 56 + ((i * 17) % 48); // 56..104
    const delay = (i % 7) * 0.6;
    const duration = 14 + ((i * 5) % 12);
    const drift = i % 2 === 0 ? 30 : -30;
    return { s, left, top, size, delay, duration, drift, i };
  });

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {bubbles.map(({ s, left, top, size, delay, duration, drift, i }) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full flex items-center justify-center backdrop-blur-sm"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            background:
              i % 3 === 0
                ? "radial-gradient(circle, oklch(0.55 0.22 300 / 0.18), transparent 70%)"
                : i % 3 === 1
                  ? "radial-gradient(circle, oklch(0.86 0.18 200 / 0.16), transparent 70%)"
                  : "radial-gradient(circle, oklch(0.82 0.16 85 / 0.14), transparent 70%)",
            border: "1px solid oklch(0.7 0.15 295 / 0.18)",
          }}
          animate={{
            y: [0, drift, 0],
            x: [0, drift / 2, 0],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={s.logoUrl}
            alt=""
            loading="lazy"
            className="w-1/2 h-1/2 object-contain opacity-60 mix-blend-screen"
            style={{ filter: "drop-shadow(0 0 8px oklch(0.7 0.18 295 / 0.4))" }}
          />
        </motion.div>
      ))}
    </div>
  );
}
