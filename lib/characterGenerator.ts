import abilities from './rules/abilities';
import backgrounds from './rules/backgrounds';
import folkList from './rules/folk';
import knacks from './rules/knacks';
import itemList from './rules/items';
import names from './rules/names';

function shuffle(array) {
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

const spellcasting = ['Deceit', 'Spiritism', 'Thaumaturgy', 'Theurgy'];

function getFolk() {
  return folkList[Math.floor(Math.random() * folkList.length)];
}

function getBackground() {
  // TODO backgrounds need modifiers (_fruit_ monger, etc)
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

function getAbilites() {
  return shuffle([...abilities]).slice(0, 2);
}

function getKnacks(abilities) {
  let charKnacks = {};
  let remainingKnacks = [...knacks];
  let spellKnacks = [];
  const clever = abilities.filter(a => a === 'clever').length === 1;

  if (clever) {
    //  choose one core knack 2x
    const coreKnacks = knacks.filter(k => k.kind === 'core');
    const core = coreKnacks[Math.floor(Math.random() * coreKnacks.length)];
    charKnacks[core.name] = {
      level: 2,
      ...core,
    };
    if (core.name !== 'Concentration') {
      /// Filter out spellcasting knacks if there's no room for them
      remainingKnacks = remainingKnacks.filter(
        k => spellcasting.filter(s => s === k.name).length === 0
      );
    }
  } else {
    // Else
    //choose one knack at random from all (non-advanced)
    const allButAdvancedKnacks = knacks.filter(k => k.kind !== 'advanced');
    const firstKnack =
      allButAdvancedKnacks[
        Math.floor(Math.random() * allButAdvancedKnacks.length)
      ];
    charKnacks[firstKnack.name] = {
      level: 1,
      ...firstKnack,
    };
  }

  if (
    Object.keys(charKnacks).filter(
      k => spellcasting.filter(s => s === k).length
    ).length
  ) {
    //if spellcasting:
    //choose memorization
    const concentration = knacks.filter(k => k.name === 'Concentration')[0];
    charKnacks[concentration.name] = {
      level: 1,
      ...concentration,
    };
  } else if (
    Object.keys(charKnacks).filter(k => k === 'Concentration').length
  ) {
    //elif memorization:
    //  choose spellcasting at random
    spellKnacks = knacks.filter(
      k => spellcasting.filter(s => s === k.name).length
    );
    const spellKnack =
      spellKnacks[Math.floor(Math.random() * spellKnacks.length)];
    charKnacks[spellKnack.name] = {
      level: 1,
      ...spellKnack,
    };
  }

  remainingKnacks = remainingKnacks.filter(
    k => Object.keys(charKnacks).filter(cK => cK === k.name).length === 0
  );

  if (
    Object.keys(charKnacks).reduce((i, ck) => i + charKnacks[ck].level, 0) == 1
  ) {
    // If 2 free knacks
    //  choose one knack at random from remainder (loop) / do magic again
    const knackTwo =
      remainingKnacks[Math.floor(Math.random() * remainingKnacks.length)];
    charKnacks[knackTwo.name] = { level: 1, ...knackTwo };
    remainingKnacks = remainingKnacks.filter(
      k => Object.keys(charKnacks).filter(cK => cK === k.name).length === 0
    );
    if (
      Object.keys(charKnacks).filter(
        k => spellcasting.filter(s => s === k).length
      ).length
    ) {
      //if spellcasting:
      //choose memorization
      const concen = knacks.filter(k => k.name === 'Concentration')[0];
      charKnacks[concen.name] = { level: 1, ...concen };
    } else if (
      Object.keys(charKnacks).filter(k => k === 'Concentration').length
    ) {
      //elif memorization:
      //  choose spellcasting at random
      spellKnacks = knacks.filter(
        k => spellcasting.filter(s => s === k.name).length
      );
      const spellK =
        spellKnacks[Math.floor(Math.random() * spellKnacks.length)];
      charKnacks[spellK.name] = { level: 1, ...spellK };
    } else {
      // filter out other spellcasting knacks to prevent someone from having it without mem
      remainingKnacks = remainingKnacks.filter(
        k =>
          ['Concentration', ...spellcasting].filter(s => s === k.name)
            .length === 0
      );
    }
  }

  // TODO combat casting and echo (need to uncomment them, too)

  if (
    Object.keys(charKnacks).reduce((i, ck) => i + charKnacks[ck].level, 0) === 2
  ) {
    //If 1 free knack
    //  choose one knack at random from remainder minus spellcasting and memorization.
    const knackThree =
      remainingKnacks[Math.floor(Math.random() * remainingKnacks.length)];
    charKnacks[knackThree.name] = { level: 1, ...knackThree };
  }
  return charKnacks;
}

function getItems(knacks) {
  const items = shuffle([...itemList]);
  const weapons = items.filter(i => i.kind === 'weapon');
  const wearing = items.filter(i => i.kind === 'armor' || i.kind === 'clothes');
  const equipment = items.filter(i => i.kind === 'equipment');
  const coins = 5;
  // TODO: Shields, ammo, two weapons if ranged weapon, heavy armor, money
  // TODO: don't give out items above ¢50 unless less items
  // TODO: don't give armor to casters
  return {
    weapons: [weapons[0]],
    wearing: [wearing[0]],
    equipment: [equipment[0], equipment[1], equipment[2]],
    coins,
  };
}

export default function generateCharacter() {
  const name = `${shuffle([...names.first])[0]} ${shuffle([...names.last])[0]}`;
  const level = 1;
  const folk = getFolk();
  const background = getBackground();
  const abilities = getAbilites();
  const knacks = getKnacks(abilities);
  const { coins, ...i } = getItems(knacks);
  const items = [...i.weapons, ...i.wearing, ...i.equipment];
  return {
    name,
    level,
    folk,
    background,
    abilities: abilities.map(a => ({ name: a })),
    knacks,
    //knacks: knacks.map(k => ({ name: k.name.toLowerCase() })),
    items: items.map(i => ({ name: i.name.toLowerCase() })),
    coins,
  };
}
