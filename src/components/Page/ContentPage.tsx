import React from 'react';
import MDX from '@mdx-js/runtime';

export interface Props {
  content: string;
}

const ContentPage = (props: Props) => <MDX>{props.content}</MDX>;

export default ContentPage;
