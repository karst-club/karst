import React from 'react';
import MDX from '@mdx-js/runtime';

function ContentPage(props) {
  return <MDX>{props.content}</MDX>;
}

export default ContentPage;
