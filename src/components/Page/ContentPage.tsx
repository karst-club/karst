import React from 'react';
import MDX from '@mdx-js/runtime';

export interface Props {
  content: string;
}

function ContentPage(props: Props) {
  return <MDX>{props.content}</MDX>;
}

export default ContentPage;
