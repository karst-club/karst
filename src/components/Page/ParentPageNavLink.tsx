import React from 'react';
import styled from 'styled-components';
import Page from '../../types/Page';
import NavLink from './NavLink';

export interface Props {
  page?: Page;
}

const ParentPageNavLinkWrapper = styled.div`
  padding: 5px;
`;

const ParentPageNavLink = ({ page }: Props) => {
  if (!page) return null;
  const { icon, key, title } = page;

  return (
    <ParentPageNavLinkWrapper>
      <NavLink to={`/${key}`}>
        {icon} {title}
      </NavLink>
    </ParentPageNavLinkWrapper>
  );
};

export default ParentPageNavLink;
