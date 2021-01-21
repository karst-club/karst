import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { PageProps } from 'gatsby';
import styled from 'styled-components';
import NavTree from './NavTree';
import { createPageTree } from '../../utils/createPageTree';

const PageNavWrapper = styled.div`
  padding: 1em;
  position: sticky;
  top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PageNavHeader = styled.h2`
  font-family: 'Dearest Dorothy';
  font-weight: 200;
  font-size: 48px;
`;

const PageNav: React.FC<props> = ({ props }: PageProps) => {
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
  // at top of PageNavWrapper <PageNavHeader>Explore Karst</PageNavHeader>
  const pageTree = createPageTree(data.allMdx.nodes);
  const root = pageTree[0] || {children:[]};
  const childNavs = root.children.map(
    c => <NavTree pageTree={[c]} currentPagePath={props.location.pathname} />
  )
  return (
    <PageNavWrapper>{childNavs}</PageNavWrapper>
  );
};

export default PageNav;
