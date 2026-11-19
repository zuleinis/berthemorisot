import { motion, useTransform, type MotionValue } from "motion/react";

type ProgressCircleProps = {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  lineHeight: number;
};

function ProgressCircle({
  index,
  total,
  scrollYProgress,
  lineHeight,
}: ProgressCircleProps) {
  const circleSize = 10;
  const spacing = 14;

  // The first circle starts at the top of the bottom group
  const bottomPosition =
    lineHeight - circleSize - (total - 1 - index) * spacing;

  // Each circle has its own place in the top group
  const topPosition = index * spacing;

  const start = index / total;
  const end = (index + 1) / total;

  const y = useTransform(
    scrollYProgress,
    [start, end],
    [bottomPosition, topPosition],
  );

  return (
    <motion.div
      className="absolute top-0 rounded-full bg-slate-700"
      style={{
        left: "calc(50% - 5px)",
        width: circleSize,
        height: circleSize,
        y,
      }}
    />
  );
}

type TimelineProgressProps = {
  total: number;
  scrollYProgress: MotionValue<number>;
};

export function TimelineProgress({
  total,
  scrollYProgress,
}: TimelineProgressProps) {
  const circleSize = 10;
  const spacing = 14;

  // Leave enough room for both groups
  const lineHeight = Math.max(256, (total - 1) * spacing * 2 + circleSize);

  return (
    <div
      className="absolute inset-y-0 left-6 z-10 flex items-center"
      aria-hidden="true"
    >
      <div className="relative w-6" style={{ height: lineHeight }}>
        <div
          className="absolute left-1/2 w-px -translate-x-1/2 bg-slate-400"
          style={{ top: circleSize / 2, bottom: circleSize / 2 }}
        />

        {Array.from({ length: total }, (_, index) => (
          <ProgressCircle
            key={index}
            index={index}
            total={total}
            scrollYProgress={scrollYProgress}
            lineHeight={lineHeight}
          />
        ))}
      </div>
    </div>
  );
}
