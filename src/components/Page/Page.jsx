import React from 'react';
import MDX from '@mdx-js/runtime';
import { useParams } from 'react-router-dom';
import PageHeader from './PageHeader';
import PageIcon from './PageIcon';
import ParentPageNav from './ParentPageNav';
import SubPageNav from './SubPageNav';

function Page(props) {
  let { pageId } = useParams();
  pageId = pageId || 'karst';
  const currentPageData = props.allPageData[pageId];

  if (!currentPageData) {
    return (
      <div>
        <h1>Page {pageId} Not Found</h1>
      </div>
    );
  }
  let portraitImageContent;
  let headerImageName;

  if (currentPageData.layout === 'portrait') {
    const imgUrl = require('../../../flask_api/static/media/' +
      currentPageData.image);
    portraitImageContent = (
      <div>
        <img src={imgUrl} className="Page-portrait-image" alt="header" />
      </div>
    );
    headerImageName = 'woodcuts_13.jpg';
  } else {
    headerImageName = currentPageData.image;
  }
  return (
    <div className="Page">
      <PageHeader image={headerImageName} />
      <div className="Page-content">
        <PageIcon emoji={currentPageData.icon} />
        <ParentPageNav currentPage={pageId} allPageData={props.allPageData} />
        <div className="Page-portrait-container">
          <div>
            <h1>{currentPageData.title}</h1>
            <div className="Page-data-html">
              <MDX>{currentPageData.content}</MDX>
            </div>
          </div>
          {portraitImageContent}
        </div>
        <SubPageNav subpages={currentPageData.subpages} />
      </div>
    </div>
  );
}

export default Page;
