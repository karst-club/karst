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
  let charKnacks = [];
  let remainingKnacks = [...knacks];
  let spellKnacks = [];
  const clever = abilities.filter(a => a === 'clever').length === 1;

  if (clever) {
    //  choose one core knack 2x
    const coreKnacks = knacks.filter(k => k.kind === 'core');
    const core = coreKnacks[Math.floor(Math.random() * coreKnacks.length)];
    charKnacks = [core, core];
    if (core.name !== 'Concentration') {
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
    charKnacks = [firstKnack];
  }

  if (
    charKnacks.filter(k => spellcasting.filter(s => s === k.name).length).length
  ) {
    //if spellcasting:
    //choose memorization
    charKnacks.push(knacks.filter(k => k.name === 'Concentration')[0]);
  } else if (charKnacks.filter(k => k.name === 'Concentration').length) {
    //elif memorization:
    //  choose spellcasting at random
    spellKnacks = knacks.filter(
      k => spellcasting.filter(s => s === k.name).length
    );
    charKnacks.push(
      spellKnacks[Math.floor(Math.random() * spellKnacks.length)]
    );
  }

  remainingKnacks = remainingKnacks.filter(
    k => charKnacks.filter(cK => cK.name === k.name).length === 0
  );

  if (charKnacks.length == 1) {
    // If 2 free knacks
    //  choose one knack at random from remainder (loop) / do magic again
    charKnacks.push(
      remainingKnacks[Math.floor(Math.random() * remainingKnacks.length)]
    );
    remainingKnacks = remainingKnacks.filter(
      k => charKnacks.filter(cK => cK.name === k.name).length === 0
    );
    if (
      charKnacks.filter(k => spellcasting.filter(s => s === k.name).length)
        .length
    ) {
      //if spellcasting:
      //choose memorization
      charKnacks.push(knacks.filter(k => k.name === 'Concentration')[0]);
    } else if (charKnacks.filter(k => k.name === 'Concentration').length) {
      //elif memorization:
      //  choose spellcasting at random
      spellKnacks = knacks.filter(
        k => spellcasting.filter(s => s === k.name).length
      );
      charKnacks.push(
        spellKnacks[Math.floor(Math.random() * spellKnacks.length)]
      );
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

  if (charKnacks.length === 2) {
    //If 1 free knack
    //  choose one knack at random from remainder minus spellcasting and memorization.
    charKnacks.push(
      remainingKnacks[Math.floor(Math.random() * remainingKnacks.length)]
    );
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
  const about = getBackground();
  const abilities = getAbilites();
  const knacks = getKnacks(abilities);
  const { coins, ...i } = getItems(knacks);
  const items = [...i.weapons, ...i.wearing, ...i.equipment];
  return {
    name,
    level,
    folk,
    about,
    abilities: abilities.map(a => ({ name: a })),
    knacks: knacks.map(k => ({ name: k.name.toLowerCase() })),
    items: items.map(i => ({ name: i.name.toLowerCase() })),
    coins,
  };
}
