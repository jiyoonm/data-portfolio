// src/lib/notion-queries.js
import { notion, dbId } from "./notion";

const fileUrl = (f) =>
  (f?.type === "file" ? f.file?.url : f?.external?.url) || null;

export async function getAllItems() {
  const res = await notion.databases.query({
    database_id: dbId,
    sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
    page_size: 100,
  });

  return res.results.map((page) => {
    const p = page.properties;
    const files = p.image?.files ?? [];
    const firstImage = files.length ? fileUrl(files[0]) : null;

    return {
      id: page.id,
      name: p.title?.title?.[0]?.plain_text ?? "Untitled",
      slug: p.slug?.rich_text?.[0]?.plain_text ?? page.id,
      description: p.descriptions?.rich_text?.[0]?.plain_text ?? "",
      year: p.year?.rich_text?.[0]?.plain_text ?? "",
      technologies: (p.technologies?.multi_select ?? []).map((t) => t.name),
      thumb: firstImage,
    };
  });
}

export async function getItemBySlug(slug) {
  const res = await notion.databases.query({
    database_id: dbId,
    filter: { property: "slug", rich_text: { equals: slug } },
    page_size: 1,
  });
  return res.results[0] ?? null;
}

export async function getBlocks(pageId) {
  const out = [];
  let cursor = undefined;
  do {
    const r = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });
    out.push(...r.results);
    cursor = r.has_more ? r.next_cursor : undefined;
  } while (cursor);
  return out;
}
