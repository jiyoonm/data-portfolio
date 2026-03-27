// app/projects/page.tsx
import ProjectCard from "../components/project-card";
import { getAllItems } from "@/lib/notion-queries";

export const revalidate = 300;

export default async function ProjectsPage() {
  const items = await getAllItems();
  return (
    <main>
      <h1>Projects</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <ProjectCard info={item} />
          </li>
        ))}
      </ul>
    </main>
  );
}
