import React from 'react';
import styled from 'styled-components';
import { PageProps } from 'gatsby';
import SidebarNav from '../SidebarNav';

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledNav = styled(SidebarNav)`
  padding-right: 1em;
  flex-basis: 33.3%;
`;

const SidebarPage: React.FC<props> = ({ props }: PageProps) => {
  return (
    <PageLayout>
      <SidebarNav props={props} />
      <div>{props.children}</div>
    </PageLayout>
  );
};

export default SidebarPage;
