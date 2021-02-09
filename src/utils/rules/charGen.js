import abilities from './abilities';
import speciesList from './species';
import knacks from './knacks';

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

const names = ['Artai', 'Ragna', 'Wim'];

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
  if (abilities[0] === 'Very Clever') {
    // if very clever
    //  choose one core knack 3x
    //  return
    let coreKnacks = knacks.filter(k => k.kind === 'core');
    let core = coreKnacks[Math.floor(Math.random() * coreKnacks.length)];
    return [core, core, core];
  } else if (
    (abilities.length === 2 && abilities[0] === 'Clever') ||
    abilities[1] === 'Clever'
  ) {
    // else if clever
    //  choose one core knack 2x
  }

  // TODO being clever.
  const shuffled = shuffle([...knacks]);
  const s0 = shuffled[0];
  const s1 = shuffled[1];
  const s2 = shuffled[2];
  return `${s0.verb} ${s0.display}, ${s1.verb != s0.verb ? s1.verb + ' ' : ''}${
    shuffled[1].display
  }, and ${s2.verb != s1.verb ? s2.verb + ' ' : ''}${shuffled[2].display}`;
};

const getRandomKnack = () => {
  return 'foo';
};

const generate = () => {
  const name = shuffle([...names])[0];
  const species = getSpecies();
  const abilityText = getAbilites(species);
  const knackText = getKnacks(abilityText);
  return `${name} is a ${abilityText} ${species} who ${knackText}.`;
};

export default generate;
