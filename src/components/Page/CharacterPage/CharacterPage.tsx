import React from 'react';
import MDX from '@mdx-js/runtime';
import styled from 'styled-components';
import Knacks from '../../../types/Knacks';
import Sheet from '../../../types/Sheet';
import CharacterAttribute from './CharacterAttribute';
import KnackDisplay from './KnackDisplay';
import speciesAbilities from './speciesAbilities.constants';

export interface Props {
  content: string;
  image?: string;
  knacks?: Knacks;
  sheet?: Sheet;
}

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FlexChild = styled.div`
  flex-basis: 50%;
`;

const PortraitImage = styled.img`
  width: 50%;
  display: block;
  float: right;
  padding-left: 1em;
  padding-bottom: 1em;
`;

const CharacterPage = (props: Props) => {
  const { content, image, knacks, sheet } = props;
  if (!sheet) return null;

  const {
    attributes,
    coins,
    hook,
    hp,
    items,
    knacks: characterKnacks,
    level,
    max_hp,
    player,
    species,
    xp,
  } = sheet;

  const abilities =
    species && characterKnacks?.concat(speciesAbilities[species]);
  const imgUrl = image && require(`../../../../static/media/${image}`);

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
            {abilities?.map(knackName => (
              <KnackDisplay knackName={knackName} knacks={knacks} />
            ))}
          </ul>
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
      <h2>About</h2>
      <PortraitImage
        src={imgUrl}
        className="Page-portrait-image"
        alt="header"
      />
      <MDX>{content}</MDX>
      <h2>TODO</h2>
      <ul>
        <li>Saves</li>
        <li>Spells</li>
        <li>AC</li>
        <li>Attacks</li>
        <li>Focus</li>
        <li>Move Rate</li>
      </ul>
    </div>
  );
};

export default CharacterPage;
