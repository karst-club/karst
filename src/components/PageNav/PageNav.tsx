import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { PageProps } from 'gatsby';
import styled from 'styled-components';
import NavTree from './NavTree';
import { createPageTree } from '../../utils/createPageTree';

const PageNavWrapper = styled.div`
  padding: 1em;
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
            icon
            title
            menu_order
          }
        }
      }
    }
  `);
  const pageTree = createPageTree(data.allMdx.nodes);
  return (
    <PageNavWrapper>
      <PageNavHeader>Explore Karst</PageNavHeader>
      <NavTree pageTree={pageTree} currentPagePath={props.location.pathname} />
    </PageNavWrapper>
  );
};

export default PageNav;
