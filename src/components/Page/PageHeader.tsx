import React from 'react';
import styled from 'styled-components';

export interface Props {
  image?: string;
}

const PageHeaderImage = styled.img`
  display: block;
  object-fit: cover;
  border-radius: 0px;
  width: 100%;
  height: 30vh;
  opacity: 1;
  object-position: center 39.59%;
`;

const PageHeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30vh;
  cursor: default;
  background-color: #282c34;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const PageHeader = ({ image = 'little_tropical_island.jpg' }: Props) => {
  if (!image) return null;
  const imgUrl = require(`../../../static/media/${image}`);

  return (
    <header>
      <PageHeaderWrapper>
        <PageHeaderImage src={imgUrl} alt="header" />
      </PageHeaderWrapper>
    </header>
  );
};

export default PageHeader;
