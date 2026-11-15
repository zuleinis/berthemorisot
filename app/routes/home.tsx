import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Timeline } from "~/components/Timeline";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Berthe Morisot" },
    { name: "description", content: "Explore the works of Berthe Morisot." },
  ];
}

export default function Home() {
  return (
    <>
      <Welcome />
      <Timeline />
    </>
  );
}
