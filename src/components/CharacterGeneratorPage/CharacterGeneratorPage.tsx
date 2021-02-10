import React from 'react';
import styled from 'styled-components';
import { PageProps } from 'gatsby';
import KnackDisplay from '../../components/RulesetDisplay/KnackDisplay';
import SpeciesAbilityDisplay from '../RulesetDisplay/SpeciesAbilityDisplay';
import generate from '../../utils/rules/charGen';

const CharacterGeneratorPage: React.FC<props> = ({ props }: PageProps) => {
  return (
    <>
      <h1>A Random Soul</h1>
      {generate()}
    </>
  );
};

export default CharacterGeneratorPage;
