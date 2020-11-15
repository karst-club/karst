interface MdxNodeFrontmatter {
  icon: string;
  title: string;
  menu_order: number;
}

export default interface PageTreeMdxNode {
  id: string;
  slug: string;
  frontmatter: MdxNodeFrontmatter;
  linkPath?: string;
  paths?: [string];
  children?: [PageTreeMdxNode];
}
