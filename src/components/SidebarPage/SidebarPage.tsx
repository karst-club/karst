import React from 'react';
import styled from 'styled-components';
import { PageProps } from 'gatsby';
import SidebarNav from '../SidebarNav';

const PageLayout = styled.div`
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SidebarWrap = styled.div`
  margin-left: -1em;
  margin-right: 1em;
  @media (min-width: 768px) {
    width: 33%;
    padding-right: 1em;
    margin-top: 2em;
  }
`;

const ContentWrap = styled.div`
  @media (max-width: 767px) {
    order: -1;
  }
  @media (min-width: 768px) {
    width: 66%;
  }
`;

const SidebarPage: React.FC<props> = ({ props }: PageProps) => {
  return (
    <PageLayout>
      <SidebarWrap>{props.sidebarChildren}</SidebarWrap>
      <ContentWrap>{props.children}</ContentWrap>
    </PageLayout>
  );
};

export default SidebarPage;
