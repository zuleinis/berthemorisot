import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { ScrollingTimelineEvent } from "./ScrollingTimelineEvent";
import { timelineEvents } from "../../data";
import { FadingTimelineImage } from "./FadingTimelineImage";

export const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const eventDuration = 1 / timelineEvents.length;
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress <= 0 || progress >= 1) {
      setActiveImageIndex(null);
      return;
    }

    const index = Math.floor(progress * timelineEvents.length);
    const eventProgress = (progress - index * eventDuration) / eventDuration;

    setActiveImageIndex(eventProgress < 0.9 ? index : null);
  });

  const imageScale = useTransform(
    scrollYProgress,
    [
      0,
      eventDuration * 0.5,
      1 - eventDuration * 0.3,
      1 - eventDuration * 0.1,
      1,
    ],
    [0.9, 1, 1, 0.9, 0.9],
  );

  return (
    <section
      ref={sectionRef}
      style={{ height: `${(timelineEvents.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 grid h-screen grid-cols-2 items-center">
        <motion.div
          className="relative h-screen w-full"
          style={{ scale: imageScale }}
        >
          {timelineEvents.map((event, index) => (
            <FadingTimelineImage
              key={event.image.src}
              image={event.image}
              index={index}
              total={timelineEvents.length}
              scrollYProgress={scrollYProgress}
              active={index === activeImageIndex}
            />
          ))}
        </motion.div>
        <div className="relative h-full overflow-hidden">
          {timelineEvents.map((event, index) => (
            <ScrollingTimelineEvent
              key={index}
              event={event}
              index={index}
              total={timelineEvents.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
