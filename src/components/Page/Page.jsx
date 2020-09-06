import React from 'react';
import styled from 'styled-components';
import MDX from '@mdx-js/runtime';
import { useParams } from 'react-router-dom';
import PageHeader from './PageHeader';
import PageIcon from './PageIcon';
import ParentPageNav from './ParentPageNav';
import SubPageNav from './SubPageNav';
import CharacterPage from './CharacterPage';
import ContentPage from './ContentPage';

const PageContent = styled.div`
  padding-left: calc(96px + env(safe-area-inset-left));
  padding-right: calc(96px + env(safe-area-inset-right));
  max-width: 900px;
  margin-bottom: 8px;
`;

const PagePortraitContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

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
    const imgUrl = require('../../../static/media/' + currentPageData.image);
    portraitImageContent = (
      <div>
        <img src={imgUrl} className="Page-portrait-image" alt="header" />
      </div>
    );
    headerImageName = 'little_tropical_island.jpg';
  } else {
    headerImageName = currentPageData.image;
  }

  const content =
    currentPageData.layout === 'character' ? (
      <CharacterPage
        sheet={currentPageData.sheet}
        content={currentPageData.content}
      />
    ) : (
      <ContentPage content={currentPageData.content} />
    );

  return (
    <div className="Page">
      <PageHeader image={headerImageName} />
      <PageContent>
        <PageIcon emoji={currentPageData.icon} />
        <ParentPageNav currentPage={pageId} allPageData={props.allPageData} />
        <PagePortraitContainer>
          <div>
            <h1>{currentPageData.title}</h1>
            <div className="Page-data-html">{content}</div>
          </div>
          {portraitImageContent}
        </PagePortraitContainer>
        <SubPageNav subpages={currentPageData.subpages} />
      </PageContent>
    </div>
  );
}

export default Page;
