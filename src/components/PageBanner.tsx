import React from 'react';
import styled from 'styled-components';
import bannerImage from '../images/ship_scene.png';

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

const PageBanner: React.FC = () => {
  return (
    <header>
      <PageHeaderWrapper>
        <PageHeaderImage src={bannerImage} alt="header" />
      </PageHeaderWrapper>
    </header>
  );
};

export default PageBanner;
