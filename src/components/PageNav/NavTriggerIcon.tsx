import React from 'react';
import { IconContext } from 'react-icons';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const NavTriggerIcon: React.FC<Species> = (isOpen: bool) => {
  let navIcon = <FaPlusCircle />;
  if (isOpen) {
    navIcon = <FaMinusCircle />;
  }
  return (
    <IconContext.Provider value={{ className: 'react-icons', size: '0.85em' }}>
      {navIcon}
    </IconContext.Provider>
  );
};

export default NavTriggerIcon;
