import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Doc = GetTypeByName<typeof configuration, "Doc">;
export declare const allDocs: Array<Doc>;

export type Page = GetTypeByName<typeof configuration, "Page">;
export declare const allPages: Array<Page>;

export type Showcase = GetTypeByName<typeof configuration, "Showcase">;
export declare const allShowcases: Array<Showcase>;

export type Blog = GetTypeByName<typeof configuration, "Blog">;
export declare const allBlogs: Array<Blog>;

export {};
