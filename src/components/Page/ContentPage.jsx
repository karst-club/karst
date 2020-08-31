import React from 'react';
import styled from 'styled-components';
import MDX from '@mdx-js/runtime';
import { useParams } from 'react-router-dom';

const ContentPageContent = styled.div``;

function ContentPage(props) {
  return <MDX>{props.pageData.content}</MDX>;
}

export default ContentPage;
