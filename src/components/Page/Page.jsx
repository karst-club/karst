import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
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

function Page(props) {
  let { pageId } = useParams();
  pageId = pageId || 'karst';
  const currentPageData = props.data.pages[pageId];
  if (!currentPageData) {
    return (
      <div>
        <h1>Page {pageId} Not Found</h1>
      </div>
    );
  }
  let headerImageName;

  if (currentPageData.layout === 'character') {
    headerImageName = 'little_tropical_island.jpg';
  } else {
    headerImageName = currentPageData.image;
  }

  const content =
    currentPageData.layout === 'character' ? (
      <CharacterPage
        sheet={currentPageData.sheet}
        content={currentPageData.content}
        image={currentPageData.image}
        allKnacks={props.data.knacks}
      />
    ) : (
      <ContentPage content={currentPageData.content} />
    );

  return (
    <div className="Page">
      <PageHeader image={headerImageName} />
      <PageContent>
        <PageIcon emoji={currentPageData.icon} />
        <ParentPageNav currentPage={pageId} allPageData={props.data.pages} />
        <h1>{currentPageData.title}</h1>
        <div className="Page-data-html">{content}</div>
        <SubPageNav subpages={currentPageData.subpages} />
        <ReactTooltip delayShow="500" />
      </PageContent>
    </div>
  );
}

export default Page;
