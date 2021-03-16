import React from 'react';

const abilitiesDisplay = ([a, b]) => (a === b ? `Very ${a}` : `${a} and ${b}`);

const knacksDisplay = charKnacks => {
  const s0 = charKnacks[0];
  const s1 = charKnacks[1];
  const s2 = charKnacks[2];
  return `${s0.verb} ${s0.display}, ${s1.verb != s0.verb ? s1.verb + ' ' : ''}${
    s1.display
  }, and ${s2.verb != s1.verb ? s2.verb + ' ' : ''}${s2.display}`;
};
const itemsDisplay = ({ weapons, wearing, equipment, coins }) => {
  return `wield a ${weapons[0].name}, wear ${wearing[0].name}, and have a ${equipment[0].name}, a ${equipment[1].name} and ¢${coins}`;
};

const CharacterDisplay: React.FC<props> = ({ character }: Props) => {
  const { name, species } = character;
  const abilityText = abilitiesDisplay(character.abilities);
  const knackText = knacksDisplay(character.knacks);
  const itemsText = itemsDisplay(character.items);
  return `${name} is a ${abilityText} ${species} who ${knackText}. They ${itemsText}. They have ${character.getDefense()} defense and ${character.getHealth()} health.`;
};

export default CharacterDisplay;
