import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { PageProps } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { createPageTree } from '../../utils/createPageTree';

const SiteNavWrapper = styled.div`
  padding: 1em;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fefdf8;
`;

const NavLink = styled(Link)<Props>`
  color: inherit;
  text-decoration: inherit;
  font-family: 'Hiawatha';
  font-size: 1.5rem;
`;

const SiteNav: React.FC<props> = ({ props }: PageProps) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          id
          slug
          frontmatter {
            title
            menu_order
          }
        }
      }
    }
  `);
  const pageTree = createPageTree(data.allMdx.nodes);
  const root = pageTree[0] || { children: [] };
  const sorted = root.children.sort((c1, c2) => {
    return c1.frontmatter.menu_order > c2.frontmatter.menu_order ? 1 : -1;
  });
  const childNavs = [root, ...sorted].map(n => {
    const { pathname } = props.location;
    const isInPath =
      (n.linkPath.length > 1 && pathname.startsWith(n.linkPath)) ||
      pathname === n.linkPath;
    return (
      <NavLink to={n.linkPath} style={{ color: isInPath ? '#851a12' : null }}>
        {n.frontmatter.title}
      </NavLink>
    );
  });
  return <SiteNavWrapper>{childNavs}</SiteNavWrapper>;
};

export default SiteNav;
