import { toc } from "mdast-util-toc";
import { remark } from "remark";
import { visit } from "unist-util-visit";

const textTypes = ["text", "emphasis", "strong", "inlineCode"];

interface UnistNode {
  type: string;
  value?: string;
  children?: UnistNode[];
  url?: string;
}

function flattenNode(node: UnistNode) {
  const p: string[] = [];
  visit(node, (node: UnistNode) => {
    if (!textTypes.includes(node.type)) return;
    if (node.value) p.push(node.value);
  });
  return p.join(``);
}

interface Item {
  title: string;
  url: string;
  items?: Item[];
}

interface Items {
  items?: Item[];
}

function getItems(node: UnistNode, current: Partial<Item>): Items {
  if (!node) {
    return {};
  }

  if (node.type === "paragraph") {
    visit(node, (item: UnistNode) => {
      if (item.type === "link") {
        current.url = item.url;
        current.title = flattenNode(node);
      }

      if (item.type === "text") {
        current.title = flattenNode(node);
      }
    });

    return current;
  }

  if (node.type === "list") {
    current.items = node.children?.map((i: UnistNode) => getItems(i, {})) as Item[];

    return current;
  } else if (node.type === "listItem") {
    const heading = getItems(node.children?.[0] as UnistNode, {});

    if (node.children && node.children.length > 1) {
      getItems(node.children[1], heading);
    }

    return heading;
  }

  return {};
}

const getToc = () => (node: UnistNode, file: { data?: unknown }) => {
  // @ts-expect-error - toc function expects mdast Node type, but we use UnistNode for simplicity
  const table = toc(node);
  file.data = getItems(table.map as UnistNode, {});
};

export type TableOfContents = Items;

export async function getTableOfContents(
  content: string,
): Promise<TableOfContents> {
  const result = await remark().use(getToc).process(content);

  return result.data as TableOfContents;
}
