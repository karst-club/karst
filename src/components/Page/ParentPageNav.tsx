import React from 'react';
import styled from 'styled-components';
import ParentPageNavLink from './ParentPageNavLink';

const ParentPageNavWrapper = styled.div`
  display: flex;
  margin: 5px;
`;

function ParentPageNav(props) {
  let pageLineage = [];

  let constructLineage = (pageId) => {
    // recursively trace navigation lineage
    let currentPageData = props.allPageData[pageId];
    pageLineage.push(currentPageData);
    if (currentPageData && currentPageData.parent_page) {
      constructLineage(currentPageData.parent_page);
    }
  };

  constructLineage(props.currentPage);

  const parentNavItems = pageLineage
    .reverse()
    .map((pageData) => (
      <ParentPageNavLink key={pageData.key} pageData={pageData} />
    ));

  return <ParentPageNavWrapper>{parentNavItems}</ParentPageNavWrapper>;
}

export default ParentPageNav;
