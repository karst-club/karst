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
  console.log(props.location.pathname);
  console.log(props.pageContext);
  const pageTree = createPageTree(data.allMdx.nodes);
  const root = pageTree[0] || { children: [] };
  const childNavs = root.children.map(n => (
    <NavLink
      to={n.linkPath}
      style={{
        color: props.location.pathname.startsWith(n.linkPath)
          ? '#851a12'
          : null,
      }}
    >
      {n.frontmatter.title}
    </NavLink>
  ));
  return <SiteNavWrapper>{childNavs}</SiteNavWrapper>;
};

export default SiteNav;
