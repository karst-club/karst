import React from 'react';
import styled from 'styled-components';
import NavLink from './NavLink';

const SubPageList = styled.ul`
  list-style: none;
`;

function SubPageNav(props) {
  const subpages = props.subpages || [];
  const listItems = subpages.map((subpage) => (
    <li key={subpage.title}>
      <NavLink to={subpage.key}>
        {subpage.icon} {subpage.title}
      </NavLink>
    </li>
  ));
  if (subpages.length > 0) {
    return (
      <>
        <hr />
        <h1>Subpages</h1>
        <SubPageList>{listItems}</SubPageList>
      </>
    );
  }
  return <div />;
}

export default SubPageNav;
