import React from 'react';
import styled from 'styled-components';
import Subpage from '../../types/Subpage';
import NavLink from './NavLink';

export interface Props {
  subpages: Subpage[];
}

const SubPageList = styled.ul`
  list-style: none;
`;

const SubPageNav = ({ subpages = [] }: Props) => {
  if (!subpages.length) return null;

  return (
    <>
      <hr />
      <h1>Subpages</h1>
      <SubPageList>
        {subpages.map(subpage => (
          <>
            {subpage.key && subpage.title && (
              <li key={subpage.title}>
                <NavLink to={subpage.key}>
                  {subpage.icon} {subpage.title}
                </NavLink>
              </li>
            )}
          </>
        ))}
      </SubPageList>
    </>
  );
};

export default SubPageNav;
