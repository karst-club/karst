import React from 'react';

function PageHeader(props) {
  const img = props.image || 'woodcuts_13.jpg';
  const imgUrl = require('../../../flask_api/static/media/' + img);
  return (
    <header>
      <div className="Page-header">
        <img src={imgUrl} className="Page-header-image" alt="header" />
      </div>
    </header>
  );
}

export default PageHeader;
