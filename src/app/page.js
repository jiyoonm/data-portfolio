import Image from "next/image";
import Link from "next/link";
import ProjectCard from "./components/project-card";
import { getAllItems } from "@/lib/notion-queries";

export default async function Home() {
  const items = await getAllItems();

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="grid grid-cols-2 gap-10 sm:items-start">
        <div className="bg-primary rounded-lg p-10 h-full">
          <h1>
            Hi, I'm Jiyoon ✿. I'm a designer ✎ and developer ♫ based in Brooklyn
            ✺ currently building healthcare experiences at Studio Elsewhere ✿.
          </h1>
        </div>

        {items.map((i, _index) => (
          <ProjectCard info={i} key={_index} />
        ))}
      </main>
    </div>
  );
}
