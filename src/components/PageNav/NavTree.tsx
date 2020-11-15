import React from 'react';
import { Link } from 'gatsby';
import Collapsible from 'react-collapsible';
import styled from 'styled-components';
import NavTriggerIcon from './NavTriggerIcon';

const NavList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-left: 10%;
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
            trigger={NavTriggerIcon(false)}
            triggerWhenOpen={NavTriggerIcon(true)}
            open={inCurrentPagePath}
          >
            {createTree(mdxNode.children)}
          </Collapsible>
        );
      }
    };
    return (
      <NavList>
        {tree.map(mdxNode => (
          <li key={mdxNode.linkPath}>
            <NavLink to={mdxNode.linkPath}>
              {mdxNode.frontmatter.icon} {mdxNode.frontmatter.title}
            </NavLink>
            {childrenTree(mdxNode)}
          </li>
        ))}
      </NavList>
    );
  };

  return createTree(pageTree);
};

export default NavTree;
