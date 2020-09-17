import React from 'react';
import styled from 'styled-components';

export interface Props {
  emoji: string;
}

const PageHeaderIcon = styled.div`
  display: flex;
  height: 78px;
  width: 78px;

  align-items: center;
  justify-content: center;

  align-self: flex-start;
  border-radius: 3px;
  flex-shrink: 0;
  margin-top: -24px;
  margin-left: 3px;
  margin-bottom: 0px;

  position: relative;
  z-index: 1;

  font-size: 78px;
  color: black;
  line-height: 1em;
`;

const PageIcon = ({ emoji }: Props) => (
  <PageHeaderIcon>
    <span>{emoji}</span>
  </PageHeaderIcon>
);

export default PageIcon;
