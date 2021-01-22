import React from 'react';
import styled from 'styled-components';
import { PageProps } from 'gatsby';
import SidebarNav from '../SidebarNav';

const RulesLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledNav = styled(SidebarNav)`
  padding: 1em;
  flex-basis: 34%;
`;

const RulesPage: React.FC<props> = ({ props }: PageProps) => {
  return (
    <RulesLayout>
      <StyledNav props={{ slug: 'rulebook/', ...props }} />
      <div>{props.children}</div>
    </RulesLayout>
  );
};

export default RulesPage;
