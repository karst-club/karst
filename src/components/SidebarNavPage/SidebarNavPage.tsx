import React from 'react';
import styled from 'styled-components';
import { PageProps } from 'gatsby';
import SidebarNav from '../SidebarNav';
import SidebarPage from '../SidebarPage';

const SidebarNavPage: React.FC<props> = ({ props }: PageProps) => {
  const sidebarChildren = <SidebarNav props={props} />;
  return <SidebarPage props={{ sidebarChildren, ...props }} />;
};

export default SidebarNavPage;
