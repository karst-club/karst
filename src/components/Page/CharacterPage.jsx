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

function KnackDisplay({knack, allKnacks}) {
  const knackInfo = allKnacks[knack]
  if (knackInfo) {
    console.log(knackInfo.content)
  }
  else {
    console.log("no knackInfo available for knack " + knack)
  }
  return (
    <li key={knack}>{knack}</li>
  )
}

const speciesAbilities = {
  Eekhorn: [],
  Grevling: ['Grevling: +4 to all Saves'],
  Lagartos: [],
  Serpos: [
    'Serpos: Infravision',
    'Serpos: +4 to Death and Paralysis Saves',
    'Serpos: +1 Find Hidden Mechanism or Construction',
  ],
  Veldling: [],
  Visita: [
    'Visita: Reroll HP Dice',
    'Visita: +1 to morale/loyaly rolls',
    'Visita: +1 understand language',
  ],
};

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

function CharacterPage(props) {
  const { image, sheet } = props;
  const attrs = sheet.attributes;
  const abilities = sheet.knacks.concat(speciesAbilities[sheet.species]);

  const knacks = abilities.map((knack) =>
    <KnackDisplay knack={knack} allKnacks={props.allKnacks}/>
  );
  const items = sheet.items.map((item) => <li key={item}>{item}</li>);
  const imgUrl = require('../../../static/media/' + image);

  return (
    <div>
      <em>{sheet.hook}</em>
      <FlexContainer>
        <FlexChild>
          <h2>Vitals</h2>
          <ul>
            <li>Player: {sheet.player}</li>
            <li>Species: {sheet.species}</li>
            <li>Level: {sheet.level}</li>
            <li>XP: {sheet.xp}</li>
            <li>
              {' '}
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
      <PortraitImage
        src={imgUrl}
        className="Page-portrait-image"
        alt="header"
      />
      <MDX>{props.content}</MDX>
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
}

export default CharacterPage;
