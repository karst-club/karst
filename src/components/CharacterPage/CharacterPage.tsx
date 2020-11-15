import React from 'react';
import styled from 'styled-components';
import { PageProps } from 'gatsby';
import Sheet from '../../../types/Sheet';
import CharacterAttribute from './CharacterAttribute';
import KnackDisplay from '../../components/RulesetDisplay/KnackDisplay';
import SpeciesAbilityDisplay from '../RulesetDisplay/SpeciesAbilityDisplay';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FlexChild = styled.div`
  flex-basis: 50%;
`;

const CharacterPage: React.FC<props> = ({ props }: PageProps) => {
  const sheet: Sheet = props.pageContext.frontmatter.sheet;

  const {
    attributes,
    coins,
    hook,
    hp,
    items,
    knacks,
    level,
    max_hp,
    player,
    species,
    xp,
  } = sheet;

  return (
    <div>
      <em>{hook}</em>
      <FlexContainer>
        <FlexChild>
          <h2>Vitals</h2>
          <ul>
            <li>Player: {player}</li>
            <li>Species: {species}</li>
            <li>Level: {level}</li>
            <li>XP: {xp}</li>
            <li>
              {' '}
              HP: {hp} / {max_hp}
            </li>
            <li>Coins: ¢{coins}</li>
          </ul>
        </FlexChild>
        <FlexChild>
          <h2>Attributes</h2>
          {attributes && (
            <ul>
              <CharacterAttribute name="Str" value={attributes.str} />
              <CharacterAttribute name="Dex" value={attributes.dex} />
              <CharacterAttribute name="Con" value={attributes.con} />
              <CharacterAttribute name="Int" value={attributes.int} />
              <CharacterAttribute name="Wis" value={attributes.wis} />
              <CharacterAttribute name="Cha" value={attributes.cha} />
            </ul>
          )}
        </FlexChild>
        <FlexChild>
          <h2>Knacks</h2>
          <ul>
            {knacks?.map(knackName => (
              <KnackDisplay key={knackName} knackName={knackName} />
            ))}
          </ul>
          <h3>Species Abilities</h3>
          <SpeciesAbilityDisplay species={species} />
        </FlexChild>
        <FlexChild>
          <h2>Items</h2>
          <ul>
            {items?.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </FlexChild>
      </FlexContainer>
      <h2>TODO</h2>
      <ul>
        <li>Saves</li>
        <li>Spells</li>
        <li>AC</li>
        <li>Attacks</li>
        <li>Focus</li>
        <li>Move Rate</li>
      </ul>
      <h2>About</h2>
      {props.children}
    </div>
  );
};

export default CharacterPage;
