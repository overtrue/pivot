import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Doc = GetTypeByName<typeof configuration, "Doc">;
export declare const allDocs: Array<Doc>;

export {};
