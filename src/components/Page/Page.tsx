import KarstAPIResponse from '../../types/KarstAPIResponse';
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

export interface Props {
  data: KarstAPIResponse;
}

const PageContent = styled.div`
  padding-left: calc(96px + env(safe-area-inset-left));
  padding-right: calc(96px + env(safe-area-inset-right));
  max-width: 900px;
  margin-bottom: 8px;
`;

function Page({ data: { knacks, pages } }: Props) {
  const { pageId = 'karst' } = useParams<{ pageId: string }>();
  const currentPage = pages && pages[pageId];

  if (!currentPage) {
    return (
      <div>
        <h1>Page {pageId} Not Found</h1>
      </div>
    );
  }

  const headerImageName =
    currentPage.layout === 'character'
      ? 'little_tropical_island.jpg'
      : currentPage.image;

  const content =
    currentPage.layout === 'character' ? (
      <CharacterPage
        sheet={currentPage.sheet}
        content={currentPage.content}
        image={currentPage.image}
        knacks={knacks}
      />
    ) : (
      <ContentPage content={currentPage.content} />
    );

  return (
    <div className="Page">
      <PageHeader image={headerImageName} />
      <PageContent>
        <PageIcon emoji={currentPage.icon} />
        <ParentPageNav currentPage={pageId} pages={pages} />
        <h1>{currentPage.title}</h1>
        <div className="Page-data-html">{content}</div>
        <SubPageNav subpages={currentPage.subpages} />
        <ReactTooltip delayShow={500} />
      </PageContent>
    </div>
  );
}

export default Page;
