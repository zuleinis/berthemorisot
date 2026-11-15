import type { TimelineImage } from "./TimelineEventImage";
import { motion, useTransform, type MotionValue } from "motion/react";
import { TimelineEventImage } from "./TimelineEventImage";

interface FadingTimelineImageProps {
  image: TimelineImage;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  active: boolean;
}

export const FadingTimelineImage = ({
  image,
  index,
  total,
  scrollYProgress,
  active,
}: FadingTimelineImageProps) => {
  const eventDuration = 1 / total;
  const start = index * eventDuration;
  const end = (index + 1) * eventDuration;

  const opacity = useTransform(
    scrollYProgress,
    [
      start,
      start + eventDuration * 0.5,
      start + eventDuration * 0.7,
      start + eventDuration * 0.9,
      end,
    ],
    [0, 1, 1, 0, 0],
  );
  return (
    <motion.figure
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
      style={{
        opacity,
        pointerEvents: active ? "auto" : "none",
      }}
      aria-hidden={!active}
      inert={!active}
    >
      <TimelineEventImage image={image} />
    </motion.figure>
  );
};
