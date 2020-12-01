interface MdxNodeFrontmatter {
  title: string;
  menu_order: number;
  pub_date?: number;
  sheet?: Object;
}

export default interface PageTreeMdxNode {
  id: string;
  slug: string;
  frontmatter: MdxNodeFrontmatter;
  linkPath?: string;
  paths?: [string];
  children?: [PageTreeMdxNode];
}
