import abilities from './abilities';
import speciesList from './species';
import knacks from './knacks';
import itemList from './items';
import names from './names';

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

const getSpecies = () =>
  speciesList[Math.floor(Math.random() * speciesList.length)];

const getAbilites = species => {
  const shuffled = shuffle([...abilities]);
  if (species === 'Visita') {
    return `Very ${shuffled[0]}`;
  }
  return `${shuffled[0]} and ${shuffled[1]}`;
};

const getKnacks = abilities => {
  let charKnacks = [];
  let remainingKnacks = [...knacks];
  if (abilities === 'Very Clever') {
    // if very clever
    //  choose one core knack 3x
    //  return
    let coreKnacks = knacks.filter(k => k.kind === 'core');
    let core = coreKnacks[Math.floor(Math.random() * coreKnacks.length)];
    charKnacks = [core, core, core];
  } else if (abilities.indexOf('Clever') > -1) {
    // else if clever
    //  choose one core knack 2x
    let coreKnacks = knacks.filter(k => k.kind === 'core');
    let core = coreKnacks[Math.floor(Math.random() * coreKnacks.length)];
    charKnacks = [core, core];
    if (core.name !== 'Memorization') {
      remainingKnacks = remainingKnacks.filter(
        k => spellcasting.filter(s => s === k.name).length === 0
      );
    }
  } else {
    // Else
    //choose one knack at random from all (non-expert)
    let allButExpertKnacks = knacks.filter(k => k.kind !== 'expert');
    let core =
      allButExpertKnacks[Math.floor(Math.random() * allButExpertKnacks.length)];
    charKnacks = [core];
  }

  if (charKnacks.length < 3) {
    if (
      charKnacks.filter(k => spellcasting.filter(s => s === k.name).length)
        .length
    ) {
      //if spellcasting:
      //choose memorization
      charKnacks.push(knacks.filter(k => k.name === 'Memorization')[0]);
    } else if (charKnacks.filter(k => k.name === 'Memorization').length) {
      //elif memorization:
      //  choose spellcasting at random
      let spellKnacks = knacks.filter(
        k => spellcasting.filter(s => s === k.name).length
      );
      charKnacks.push(
        spellKnacks[Math.floor(Math.random() * spellKnacks.length)]
      );
    }
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
      charKnacks.push(knacks.filter(k => k.name === 'Memorization')[0]);
    } else if (charKnacks.filter(k => k.name === 'Memorization').length) {
      //elif memorization:
      //  choose spellcasting at random
      let spellKnacks = knacks.filter(
        k => spellcasting.filter(s => s === k.name).length
      );
      charKnacks.push(
        spellKnacks[Math.floor(Math.random() * spellKnacks.length)]
      );
    } else {
      // filter out other spellcasting knacks to prevent someone from having it without mem
      remainingKnacks = remainingKnacks.filter(
        k => spellcasting.filter(s => s === k.name).length === 0
      );
    }
  }

  if (charKnacks.length === 2) {
    charKnacks.push(
      remainingKnacks[Math.floor(Math.random() * remainingKnacks.length)]
    );
  }

  //If 1 free knack
  //  choose one knack at random from remainder minus spellcasting and memorization.

  // TODO being clever.
  const shuffled = shuffle([...knacks]);
  //const s0 = shuffled[0];
  //const s1 = shuffled[1];
  //const s2 = shuffled[2];
  const s0 = charKnacks[0];
  const s1 = charKnacks[1];
  const s2 = charKnacks[2];
  return `${s0.verb} ${s0.display}, ${s1.verb != s0.verb ? s1.verb + ' ' : ''}${
    s1.display
  }, and ${s2.verb != s1.verb ? s2.verb + ' ' : ''}${s2.display}`;
};

const getItems = knacks => {
  const items = shuffle([...itemList]);
  const weapons = items.filter(i => i.kind === 'weapon');
  const wearing = items.filter(i => i.kind === 'armor' || i.kind === 'clothes');
  const equipment = items.filter(i => i.kind === 'equipment');
  // TODO: Shields, ammo, two weapons if ranged weapon, heavy armor, money

  return `wield a ${weapons[0].name}, wear ${wearing[0].name}, and have a ${equipment[0].name}, a ${equipment[1].name} and ¢25`;
};

const generate = () => {
  const name = `${shuffle([...names.first])[0]} ${shuffle([...names.last])[0]}`;
  const species = getSpecies();
  const abilityText = getAbilites(species);
  const knackText = getKnacks(abilityText);
  const itemText = getItems(knackText);
  return `${name} is a ${abilityText} ${species} who ${knackText}. They ${itemText}`;
};

export default generate;
