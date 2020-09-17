import styled from 'styled-components';
import { Link } from 'react-router-dom';

export interface Props {
  to: string;
}

const NavLink = styled(Link)<Props>`
  color: inherit;
  text-decoration: inherit;
`;

export default NavLink;
