import React from 'react';
import styled from 'styled-components';
import Page from '../../types/Page';
import NavLink from './NavLink';

export interface Props {
  page: Page;
}

const ParentPageNavLinkWrapper = styled.div`
  padding: 5px;
`;

function ParentPageNavLink({ page }: Props) {
  if (!page) return null;
  const { icon, key, title } = page;
  const linkUrl = `/${key}`;

  return (
    <ParentPageNavLinkWrapper>
      <NavLink to={linkUrl}>
        {icon} {title}
      </NavLink>
    </ParentPageNavLinkWrapper>
  );
}

export default ParentPageNavLink;
