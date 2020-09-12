import React from 'react';
import styled from 'styled-components';
import Page from '../../types/Page';
import Pages from '../../types/Pages';
import ParentPageNavLink from './ParentPageNavLink';

export interface Props {
  pages?: Pages;
  currentPage: string;
}

const ParentPageNavWrapper = styled.div`
  display: flex;
  margin: 5px;
`;

const constructLineage = (
  pages: Pages,
  pageId: string,
  pageLineage: Page[]
) => {
  const page = pages && pages[pageId];
  page && pageLineage.push(page);
  page?.parent_page && constructLineage(pages, page.parent_page, pageLineage);
};

const ParentPageNav = ({ pages, currentPage }: Props) => {
  const pageLineage: Page[] = [];
  if (!pages || !currentPage) return null;
  constructLineage(pages, currentPage, pageLineage);

  return (
    <ParentPageNavWrapper>
      {pageLineage.reverse().map((page) => (
        <ParentPageNavLink key={page.key} page={page} />
      ))}
    </ParentPageNavWrapper>
  );
};

export default ParentPageNav;
