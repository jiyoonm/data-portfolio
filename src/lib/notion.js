// lib/notion.ts
import { Client } from "@notionhq/client";

export const notion = new Client({ auth: process.env.NOTION_TOKEN });
export const dbId = process.env.NOTION_DATABASE_ID;
