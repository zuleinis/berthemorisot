import { motion, useTransform, type MotionValue } from "motion/react";
import type { EventItem } from "./TimelineEvent";
import { TimelineEvent } from "./TimelineEvent";

interface ScrollingTimelineEventProps {
  event: EventItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}
export const ScrollingTimelineEvent = ({
  event,
  index,
  total,
  scrollYProgress,
}: ScrollingTimelineEventProps) => {
  const start = index / total;
  const end = (index + 1) / total;
  const duration = end - start;
  const timeToStartMultiplier = 0.5;

  const y = useTransform(
    scrollYProgress,
    [
      start,
      start + duration * timeToStartMultiplier,
      start + duration * 0.7,
      start + duration * 0.9,
      end,
    ],
    ["100%", "0%", "0%", "-100%", "-100%"],
  );

  const opacity = useTransform(
    scrollYProgress,
    [
      start,
      start + duration * timeToStartMultiplier,
      start + duration * 0.7,
      start + duration * 0.9,
      end,
    ],
    [0, 1, 1, 0, 0],
  );
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6"
      style={{ y, opacity }}
    >
      <TimelineEvent event={event} />
    </motion.div>
  );
};
