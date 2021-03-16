import PageTreeMdxNode from '../../../types/PageTreeMdxNode';

let recursiveTreeBuilder = (mdxNodes, tree, depth, maxDepth) => {
  mdxNodes
    .filter((s: PageTreeMdxNode) => s.paths.length === depth)
    .filter((s: PageTreeMdxNode) => !s.linkPath.includes('404'))
    .map(node => {
      tree.push(node);
      let childNodes = mdxNodes.filter((s: PageTreeMdxNode) =>
        s.linkPath.startsWith(node.linkPath)
      );
      if (depth <= maxDepth) {
        recursiveTreeBuilder(childNodes, node.children, depth + 1, maxDepth);
      }
    });
  tree.sort((a, b) => {
    return a.frontmatter.menu_order > b.frontmatter.menu_order ? 1 : -1; //||
    //a.frontmatter.pub_date > b.pub_date
  });
  return;
};

export const createPageTree: [PageTreeMdxNode] = mdxNodes => {
  let maxTreeDepth = 0;
  mdxNodes.map(node => {
    node.linkPath = '/' + node.slug;
    node.paths = node.slug.split('/').filter((s: string) => s);
    node.children = [];
    if (node.paths.length > maxTreeDepth) {
      maxTreeDepth = node.paths.length;
    }
    return;
  });
  let pageTree = [];
  recursiveTreeBuilder(mdxNodes, pageTree, 0, maxTreeDepth);
  return pageTree;
};
