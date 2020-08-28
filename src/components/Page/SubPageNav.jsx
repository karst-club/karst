import React from "react";
import { Link } from "react-router-dom";

function SubPageNav(props) {
  const subpages = props.subpages || [];
  const listItems = subpages.map((subpage) => (
    <li key={subpage.title}>
      <Link className="NavLink" to={subpage.key}>
        {subpage.icon} {subpage.title}
      </Link>
    </li>
  ));
  if (subpages.length > 0) {
    return (
      <div className="SubPageNav">
        <hr />
        <h1>Subpages</h1>
        <ul className="SubPageNav">{listItems}</ul>
      </div>
    );
  }
  return <div />;
}

export default SubPageNav;
