import React from 'react';
import styled from 'styled-components';
import { PageProps } from 'gatsby';
import Sheet from '../../../types/Sheet';
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
    abilities,
    coins,
    hook,
    health,
    items,
    knacks,
    level,
    max_health,
    player,
    species,
    xp,
  } = sheet;

  return (
    <>
      <h1>{props.pageContext.frontmatter.title}</h1>
      <em>{hook}</em>
      <FlexContainer>
        <FlexChild>
          <h2>Vitals</h2>
          <ul>
            <li>Player: {player}</li>
            <li>Species: {species}</li>
            <li>Level: {level}</li>
            <li>
              {' '}
              Health: {health} / {max_health}
            </li>
            <li>Coins: ¢{coins}</li>
          </ul>
        </FlexChild>
        <FlexChild>
          <h2>Abilities</h2>
          {abilities && (
            <ul>
              {abilities?.map(ability => (
                <li key={ability}>{ability}</li>
              ))}
            </ul>
          )}
        </FlexChild>
        <FlexChild>
          <h2>Knacks</h2>
          <ul>
            {knacks?.map(knack => (
              <KnackDisplay key={knack.knack} characterKnack={knack} />
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
    </>
  );
};

export default CharacterPage;
