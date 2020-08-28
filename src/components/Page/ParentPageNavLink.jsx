import React from 'react';
import styled from 'styled-components';
import NavLink from './NavLink';

const ParentPageNavLinkWrapper = styled.div`
  padding: 5px;
`;

function ParentPageNavLink(props) {
  if (props.pageData) {
    const linkUrl = '/' + props.pageData.key;
    return (
      <ParentPageNavLinkWrapper>
        <NavLink to={linkUrl}>
          {props.pageData.icon} {props.pageData.title}
        </NavLink>
      </ParentPageNavLinkWrapper>
    );
  }
  return <div />;
}

export default ParentPageNavLink;
