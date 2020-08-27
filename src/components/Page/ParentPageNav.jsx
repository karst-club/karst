import React from 'react';
import ParentPageNavLink from './ParentPageNavLink';

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

  return <div className="ParentPageNav">{parentNavItems}</div>;
}

export default ParentPageNav;
