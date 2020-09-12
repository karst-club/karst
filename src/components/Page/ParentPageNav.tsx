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

function ParentPageNav({ pages, currentPage }: Props) {
  const pageLineage: Page[] = [];

  // recursively trace navigation lineage
  const constructLineage = (pageId: string) => {
    const page = pages && pages[pageId];
    page && pageLineage.push(page);
    page?.parent_page && constructLineage(page.parent_page);
  };

  constructLineage(currentPage);

  const parentNavItems = pageLineage
    .reverse()
    .map((pageData) => (
      <ParentPageNavLink key={pageData.key} page={pageData} />
    ));

  return <ParentPageNavWrapper>{parentNavItems}</ParentPageNavWrapper>;
}

export default ParentPageNav;
