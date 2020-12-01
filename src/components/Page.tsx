import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { PageProps } from 'gatsby';

import PageBanner from './PageBanner';
import PageNav from './PageNav';
import CharacterPage from './CharacterPage';

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
  flex-direction: column;
  align-items: flex-start;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PageContent = styled.div`
  padding: 1em;
  flex-basis: 66%;
`;

const StyledNav = styled(PageNav)`
  padding: 1em;
  flex-basis: 34%;
`;

const PageLayout: React.FC<props> = ({ props }: PageProps) => {
  if (props.pageContext.frontmatter.sheet) {
    return <CharacterPage props={props} />;
  }
  return <>{props.children}</>;
};

const Timestamp: React.FC<props> = ({ props }: PageProps) => {
  const timestamp = props.pageContext.frontmatter.pub_date;
  if (timestamp) {
    const time = new Date(0)
    time.setUTCSeconds(timestamp / 1000)
    return <p>{time.toDateString()}</p>;
  }
  return <></>;
};

const Page: React.FC<props> = (props: PageProps) => (
  <>
    <ReactTooltip delayShow={500} />
    <PageBanner />
    <PageBody>
      <PageContentContainer>
        <PageContent>
          <h1>{props.pageContext.frontmatter.title}</h1>
          <Timestamp props={props} />
          <PageLayout props={props} />
        </PageContent>
        <StyledNav props={props} />
      </PageContentContainer>
    </PageBody>
  </>
);

export default Page;
