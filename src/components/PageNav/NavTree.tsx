import React from 'react';
import { Link } from 'gatsby';
import Collapsible from 'react-collapsible';
import styled from 'styled-components';

const NavList = styled.ul`
  font-family: 'Hiawatha';
  font-size: 1.5rem;
  list-style: none;
  padding: 0 1em;
  flex-basis: 20%;
`;

const NavLink = styled(Link)<Props>`
  color: inherit;
  text-decoration: inherit;
`;

const NavTree: React.FunctionComponent<Species> = ({
  pageTree,
  currentPagePath,
}) => {
  const createTree = tree => {
    const childrenTree = mdxNode => {
      if (mdxNode.children.length > 0) {
        let inCurrentPagePath = false;
        if (currentPagePath.startsWith(mdxNode.linkPath)) {
          inCurrentPagePath = true;
        }
        return (
          <Collapsible
            trigger={'•'}
            triggerWhenOpen={'☼'}
            open={inCurrentPagePath}
          >
            {createTree(mdxNode.children)}
          </Collapsible>
        );
      }
    };
    // old NavLink content {mdxNode.frontmatter.icon} {mdxNode.frontmatter.title}
    return (
        <NavList>
          {tree.map(mdxNode => (
            <li key={mdxNode.linkPath}>
              <NavLink to={mdxNode.linkPath}>{mdxNode.frontmatter.title}</NavLink>
              {childrenTree(mdxNode)}
            </li>
          ))}
        </NavList>
    );
  };

  return createTree(pageTree);
};

export default NavTree;
