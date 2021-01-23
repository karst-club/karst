import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { PageProps } from 'gatsby';

import PageBanner from './PageBanner';
import SiteNav from './SiteNav';
import CharacterPage from './CharacterPage';
import SidebarPage from './SidebarPage';

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

const PageContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PageContent = styled.div`
  padding: 1em;
  width: 100%;
`;

const StyledNav = styled(SiteNav)`
  padding: 1em;
  width: 100%;
`;

const PageLayout: React.FC<props> = ({ props }: PageProps) => {
  switch (props.pageContext.frontmatter.page_type) {
    case 'character':
      return <CharacterPage props={props} />;
    case 'rules':
      return <SidebarPage props={{ slug: 'rulebook/', ...props }} />;
    case 'story':
      return <SidebarPage props={{ slug: 'story/', ...props }} />;
    case 'worldbook':
      return <SidebarPage props={{ slug: 'worldbooks/', ...props }} />;
    default:
      return (
        <>
          <h1>{props.pageContext.frontmatter.title}</h1>
          {props.children}
        </>
      );
  }
};

const Timestamp: React.FC<props> = ({ props }: PageProps) => {
  const timestamp = props.pageContext.frontmatter.pub_date;
  if (timestamp) {
    const time = new Date(0);
    time.setUTCSeconds(timestamp);
    return <p>{time.toDateString()}</p>;
  }
  return <></>;
};

//<Timestamp props={props} />

const Page: React.FC<props> = (props: PageProps) => (
  <>
    <ReactTooltip delayShow={500} />
    <PageBody>
      <StyledNav props={props} />
      <PageContentContainer>
        <PageContent>
          <PageLayout props={props} />
        </PageContent>
      </PageContentContainer>
    </PageBody>
  </>
);

export default Page;
