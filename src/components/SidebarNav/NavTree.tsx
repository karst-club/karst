import React, { Props } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Species } from '../../types/Species';

const NavList = styled.ul`
  font-family: 'Hiawatha';
  font-size: 1.5rem;
  list-style: none;
  padding: 0 1em 0 1em;
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
    return (
      <NavList>
        {tree.map(mdxNode => {
          const isCurrentPage = currentPagePath === mdxNode.linkPath;
          return (
            <li key={mdxNode.linkPath}>
              <NavLink
                to={mdxNode.linkPath}
                style={{ color: isCurrentPage ? '#851a12' : '' }}
              >
                {mdxNode.frontmatter.title}
              </NavLink>
              {mdxNode.children.length > 0
                ? createTree(mdxNode.children)
                : null}
            </li>
          );
        })}
      </NavList>
    );
  };

  return createTree(pageTree);
};

export default NavTree;
