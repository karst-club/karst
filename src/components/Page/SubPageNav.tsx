import React from 'react';
import styled from 'styled-components';
import Subpage from '../../types/Subpage';
import NavLink from './NavLink';

export interface Props {
  subpages: Subpage[];
}

const SubPageList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const SubPageNav = (props: Props) => {
  const { subpages = [] } = props;
  if (!subpages.length) return null;

  return (
    <div {...props}>
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
    </div>
  );
};

export default SubPageNav;
