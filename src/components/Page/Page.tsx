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

const PageBody = styled.div`
  padding-left: calc(16px + env(safe-area-inset-left));
  padding-right: calc(16px + env(safe-area-inset-right));
  @media (min-width: 768px) {
    padding-left: calc(48px + env(safe-area-inset-left));
    padding-right: calc(48px + env(safe-area-inset-right));
  }
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
`;

const PageTorso = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PageContent = styled.div`
  padding: 1em;
  flex-basis: 66%;
`;

const StyledNav = styled(SubPageNav)`
  padding: 1em;
  flex-basis: 34%;
`;

const Page = ({ data: { knacks, pages } }: Props) => {
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
      <PageBody>
        <div>
          <PageIcon emoji={currentPage.icon} />
          <ParentPageNav currentPage={pageId} pages={pages} />
        </div>
        <PageTorso>
          <PageContent>
            <h1>{currentPage.title}</h1>
            <div className="Page-data-html">{content}</div>
            <ReactTooltip delayShow={500} />
          </PageContent>
          <StyledNav subpages={currentPage.subpages} />
        </PageTorso>
      </PageBody>
    </div>
  );
};

export default Page;
