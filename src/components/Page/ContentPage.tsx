import React from 'react';
import MDX from '@mdx-js/runtime';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'react-router-dom';

const compositeOfDefaultComponentsPlusTheLinkComponentWeWillAdd = {
  Link: Link,
};

export interface Props {
  content: string;
}

const ContentPage = (props: Props) => (
  <MDXProvider
    components={compositeOfDefaultComponentsPlusTheLinkComponentWeWillAdd}
  >
    <MDX>{props.content}</MDX>
  </MDXProvider>
);

export default ContentPage;
