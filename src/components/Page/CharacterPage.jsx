import React from 'react';
import MDX from '@mdx-js/runtime';
import styled from 'styled-components';

function CharacterAttribute({ name, value }) {
  const displayName = name[0].toUpperCase() + name.slice(1);
  const modifier =
    value < 4
      ? -3
      : value < 6
      ? -2
      : value < 9
      ? -1
      : value < 13
      ? 0
      : value < 16
      ? 1
      : value < 18
      ? 2
      : 3;
  return (
    <li>
      {displayName}: {value} <strong>({modifier})</strong>
    </li>
  );
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

function CharacterPage(props) {
  const { sheet } = props;
  const attrs = sheet.attributes;
  const knacks = sheet.knacks.map((knack) => <li>{knack}</li>);
  const items = sheet.items.map((item) => <li>{item}</li>);

  return (
    <div>
      <em>{sheet.hook}</em>
      <FlexContainer>
        <FlexChild>
          <h2>Vitals</h2>
          <ul>
            <li>Species: {sheet.species}</li>
            <li>Level: {sheet.level}</li>
            <li>XP: {sheet.xp}</li>
            <li>
              HP: {sheet.hp} / {sheet.max_hp}
            </li>
            <li>Coins: ¢{sheet.coins}</li>
          </ul>
        </FlexChild>
        <FlexChild>
          <h2>Attributes</h2>
          <ul>
            <CharacterAttribute name="Str" value={attrs.str} />
            <CharacterAttribute name="Dex" value={attrs.dex} />
            <CharacterAttribute name="Con" value={attrs.con} />
            <CharacterAttribute name="Int" value={attrs.int} />
            <CharacterAttribute name="Wis" value={attrs.wis} />
            <CharacterAttribute name="Cha" value={attrs.cha} />
          </ul>
        </FlexChild>
        <FlexChild>
          <h2>Knacks</h2>
          <ul>{knacks}</ul>
        </FlexChild>
        <FlexChild>
          <h2>Items</h2>
          <ul>{items}</ul>
        </FlexChild>
      </FlexContainer>
      <h2>About</h2>
      <MDX>{props.content}</MDX>
    </div>
  );
}

export default CharacterPage;
