import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { TimelineEvent } from "./TimelineEvent";
import { ScrollingTimelineEvent } from "./ScrollingTimelineEvent";

const timelineEvents = [
  {
    title: "Born",
    date: "1841",
    description: "Berthe Morisot was born in Bourges, France.",
  },
  {
    title: "First Exhibition",
    date: "1874",
    description: "Participated in the first Impressionist exhibition.",
  },
];
export const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const eventDuration = 1 / timelineEvents.length;

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

  const imageOpacity = useTransform(
    scrollYProgress,
    [0, eventDuration * 0.5, 1 - eventDuration * 0.3, 1 - eventDuration * 0.1],
    [0, 1, 1, 0],
  );

  return (
    <section
      ref={sectionRef}
      style={{ height: `${(timelineEvents.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 grid h-screen grid-cols-2 items-center">
        <motion.img
          src="/berthe-self-portrait-1885.jpg"
          alt="Timeline illustration"
          className="max-h-[80vh] w-full object-contain"
          style={{ scale: imageScale, opacity: imageOpacity }}
        />
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
