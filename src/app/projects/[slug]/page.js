// app/projects/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { getItemBySlug, getBlocks } from "@/lib/notion-queries";

export const revalidate = 300;

export default async function ProjectPage({ params }) {
  const page = await getItemBySlug(params.slug);
  if (!page) return notFound();

  const p = page.properties;
  const name = p.title?.title?.[0]?.plain_text ?? "Untitled";
  const desc = p.descriptions?.rich_text?.[0]?.plain_text ?? "";
  const year = p.year?.rich_text?.[0]?.plain_text ?? "";
  const link = p.link?.url ?? null;
  const tech = (p.technologies?.multi_select ?? []).map((t) => t.name);
  const images = (p.image?.files ?? [])
    .map((f) => (f.type === "file" ? f.file.url : f.external?.url))
    .filter(Boolean);

  const blocks = await getBlocks(page.id);

  return (
    <article className="mx-auto max-w-3xl p-6 prose">
      <h1>{name}</h1>
      {year ? <p>{year}</p> : null}
      {desc ? <p>{desc}</p> : null}
      {link ? (
        <p>
          <a href={link} target="_blank" rel="noreferrer">
            Visit
          </a>
        </p>
      ) : null}
      {tech.length ? <p>{tech.join(", ")}</p> : null}

      {images.length ? (
        <div className="mt-4 grid grid-cols-1 gap-4">
          {images.map((src) => (
            <div key={src} className="relative w-full h-64">
              {/* next.config.js may need remotePatterns for Notion S3 */}
              <Image
                src={src}
                alt={name}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      ) : null}

      <hr />
      <NotionBlocks blocks={blocks} />
    </article>
  );
}

function NotionBlocks({ blocks }) {
  return (
    <div>
      {blocks.map((b) => {
        if (b.type === "paragraph") {
          const text = b.paragraph.rich_text.map((t) => t.plain_text).join("");
          return <p key={b.id}>{text}</p>;
        }
        if (b.type === "heading_2") {
          const text = b.heading_2.rich_text.map((t) => t.plain_text).join("");
          return <h2 key={b.id}>{text}</h2>;
        }
        if (b.type === "bulleted_list_item") {
          const text = b.bulleted_list_item.rich_text
            .map((t) => t.plain_text)
            .join("");
          return (
            <li key={b.id} className="list-disc ml-6">
              {text}
            </li>
          );
        }
        return <div key={b.id} />;
      })}
    </div>
  );
}
