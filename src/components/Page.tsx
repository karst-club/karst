import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { PageProps } from 'gatsby';

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
  let slug = '';
  let children;
  switch (props.pageContext.frontmatter.page_type) {
    case 'full':
      return (
        <>
          <h1>{props.pageContext.frontmatter.title}</h1>
          {props.children}
        </>
      )
    case 'character':
      slug = 'story/';
      children = <>
        <CharacterPage props={props}/>
      </>;
      break;
    case 'rules':
      slug = 'rulebook/';
      children = <>
        <h1>{props.pageContext.frontmatter.title}</h1>
        {props.children}
      </>;
      break;
    case 'story':
      slug = 'story/';
      children = <>
        <h1>{props.pageContext.frontmatter.title}</h1>
        {props.children}
      </>;
      break;
    case 'blog':
      slug = 'blog/';
      children = <>
        <h1>{props.pageContext.frontmatter.title}</h1>
        {props.children}
      </>;
      break;
    case 'worldbook':
      slug = 'worldbooks/'
    default:
      children = <>
        <h1>{props.pageContext.frontmatter.title}</h1>
        {props.children}
      </>;
  }
  return <SidebarPage props={{ ...props, slug, children}} />;
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
