import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Timeline } from "~/components/Timeline";
import { motion, useScroll, useTransform } from "motion/react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Berthe Morisot" },
    { name: "description", content: "Explore the works of Berthe Morisot." },
  ];
}

export default function Home() {
  const { scrollYProgress } = useScroll();

  const backgroundPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["0% 0%", "0% 100%"],
  );
  return (
    <div className="relative isolate text-slate-900">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #F5DDD8, #FBF7EA, #F5DEC9)",
          backgroundSize: "100% 200%",
          backgroundPosition,
        }}
      />

      <div className="relative z-10">
        <Welcome />
        <Timeline />
      </div>
    </div>
  );
}
