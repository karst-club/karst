import React from 'react';
import { Link } from 'react-router-dom';

function ParentPageNavLink(props) {
  if (props.pageData) {
    const linkUrl = '/' + props.pageData.key;
    return (
      <div className="ParentPageNavLink">
        <Link className="NavLink" to={linkUrl}>
          {props.pageData.icon} {props.pageData.title}
        </Link>
      </div>
    );
  }
  return <div />;
}

export default ParentPageNavLink;
