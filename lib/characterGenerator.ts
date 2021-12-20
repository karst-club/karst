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

function getGender() {
  const g = Math.random() * 3;
  return g < 1 ? 'f' : g < 2 ? 'm' : 't';
}

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

function filterNonsenseKnacks(knackList, knacks) {
  const keys = Object.keys(knacks);

  // X if dual, no large weapons
  // X if casting, no heavy armor
  // X if fists, not dual or large or training (maybe okay for archery)
  // X if not casting, no combat casting or echo
  // X if climbing, no heavy armor
  // X if deft, no heavy armor
  // X if shield, no large
  if (keys.indexOf('Concentration') === -1)
    knackList = knackList.filter(
      k => k.name !== 'Combat Casting' && k.name !== 'Echo'
    );
  if (
    keys.indexOf('Dual Wielding' > -1) ||
    keys.indexOf('Shield Training' > -1)
  )
    knackList = knackList.filter(k => k.name !== 'Large Weapon Training');
  if (keys.indexOf('Large Weapon Training') > -1)
    knackList = knackList.filter(
      k => k.name !== 'Dual Wielding' && k.name !== 'Shield Training'
    );
  if (
    keys.indexOf('Concentration' > -1) ||
    keys.indexOf('Climbing') ||
    keys.indexOf('Deftness')
  )
    knackList = knackList.filter(k => k.name !== 'Armor Training');
  if (keys.indexOf('Armor Training') > -1)
    knackList.filter(
      k =>
        k.name !== 'Concentration' &&
        k.name !== 'Deftness' &&
        k.name !== 'Climbing'
    );
  if (keys.indexOf('Fists of Will' > -1))
    knackList = knackList.filter(
      k =>
        k.name !== 'Large Weapon Training' &&
        k.name !== 'Dual Wielding' &&
        k.name !== 'Weapon Training'
    );
  if (
    keys.indexOf('Dual Wielding') > -1 ||
    keys.indexOf('Large Weapon Training') > -1 ||
    keys.indexOf('Weapon Training')
  )
    knackList = knackList.filter(k => k.name !== 'Fists of Will');
  return knackList;
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

  // TODO: function to filter out knacks but without the magic bit(called below, too)
  remainingKnacks = filterNonsenseKnacks(remainingKnacks, charKnacks);

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
  remainingKnacks = filterNonsenseKnacks(remainingKnacks, charKnacks);

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

function getWeapons(knacks, remainingChoices) {
  // X if large weapons, find large weapon
  // X if archery, find bow and arrows
  // X if dual wielding, get two weapons for sure (todo: need to back out of selection and give quantity back)
  // X if archery and dual wielding pick 3
  // if fists of will, no weapon (todo: need to back out of selection and give quantity back)
  // X if backstab, dagger
  // X if shield, no two-handed
  const archery = Object.keys(knacks).indexOf('Archery') > -1;
  const backstab = Object.keys(knacks).indexOf('Backstab') > -1;
  const dual = Object.keys(knacks).indexOf('Dual Wielding') > -1;
  const fists = Object.keys(knacks).indexOf('Fists of Will') > -1;
  const large = Object.keys(knacks).indexOf('Large Weapon Training') > -1;
  const shield = Object.keys(knacks).indexOf('Shield Training') > -1;
  let quantity = 1;
  let weaponList = shuffle([...itemList]).filter(i => i.kind === 'weapon');
  if (backstab) {
    const daggerIndex = weaponList.map(w => w.name).indexOf('Dagger');
    weaponList.unshift(weaponList.splice(daggerIndex, 1)[0]);
  }
  if (archery) {
    const bowIndex = weaponList.map(w => w.name).indexOf('Bow');
    weaponList.unshift(weaponList.splice(bowIndex, 1)[0]);
    quantity++;
    // TODO large bow
  }
  if (fists) {
    quantity--;
  } else if (dual || shield) {
    if (dual) quantity++;
    if (archery) {
      weaponList = weaponList.filter(
        w => w.name === 'Bow' || w.traits.indexOf('Two-handed') === -1
      );
    } else {
      weaponList = weaponList.filter(
        w => w.traits.indexOf('Two-handed') === -1 && w.name !== 'Sling'
      );
    }
  } else if (large) {
    if (archery) {
      weaponList = weaponList.filter(
        w => w.traits.indexOf('Large') > -1 || w.name === 'Bow'
      );
    } else {
      weaponList = weaponList.filter(w => w.traits.indexOf('Large') > -1);
    }
  }
  const weapons = [];
  if (quantity) {
    for (let x = 0; x < quantity; x++) {
      weapons.push(weaponList[x]);
    }
  }
  return [weapons, remainingChoices - quantity];
}

function getWearing(knacks, remainingChoices) {
  const quantity = 1;
  const deft = Object.keys(knacks).indexOf('Deftness') > -1;
  const spellcaster = Object.keys(knacks).indexOf('Concentration') > -1;
  const combatCaster = Object.keys(knacks).indexOf('Combat Casting') > -1;
  const climber = Object.keys(knacks).indexOf('Climbing') > -1;
  const heavyArmor = Object.keys(knacks).indexOf('Armor Training') > -1;
  // X if spellcasting and not combat casting, find clothes only, else if combat casting, include light armor
  // X if deft no armor
  // X if climbing, no medium or heavy
  // X if heavy armor, find heavy armor
  // else 25/25/25/25 clothes/light/medium/heavy
  let wearingList = shuffle([...itemList]).filter(
    i => i.kind === 'armor' || i.kind === 'clothes'
  );
  if (deft || (spellcaster && !combatCaster)) {
    wearingList = wearingList.filter(i => i.kind === 'clothes');
  } else if (combatCaster || climber) {
    wearingList = wearingList.filter(
      i => i.traits.indexOf('Medium') === -1 && i.traits.indexOf('Heavy') === -1
    );
  } else if (heavyArmor) {
    wearingList = wearingList.filter(i => i.traits.indexOf('Heavy') > -1);
  }

  const wearing = [];
  for (let x = 0; x < quantity; x++) {
    wearing.push(wearingList[x]);
  }
  return [wearing, remainingChoices - quantity];
}

function getEquipment(knacks, remainingChoices) {
  // X if shield training get shield
  // X if two-handed (not bow), no shield
  // if artisan's clothes get tools
  let quantity =
    remainingChoices === 3 && Math.random() < 0.25
      ? remainingChoices - 1
      : remainingChoices;

  const shield = Object.keys(knacks).indexOf('Shield Training') > -1;
  console.log(shield);
  // TODO pass in weapons and look for two-handed, instead
  const twoHanded = Object.keys(knacks).indexOf('Large Weapon Training') > -1;

  const equipmentList = shuffle([...itemList]).filter(
    i => i.kind === 'equipment'
  );
  const equipment = [];
  if (shield) {
    const shieldIndex = equipmentList.map(i => i.name).indexOf('Shield');
    equipment.push(equipmentList.splice(shieldIndex, 1)[0]);
    console.log(equipment);
    quantity--;
    remainingChoices--;
  }
  for (let x = 0; x < quantity; x++) {
    equipment.push(equipmentList[x]);
  }
  return [equipment, remainingChoices - quantity];
}

function getItems(knacks) {
  let remainingChoices = 5;
  let weapons = null;
  let wearing = null;
  let equipment = null;
  [weapons, remainingChoices] = getWeapons(knacks, remainingChoices);
  [wearing, remainingChoices] = getWearing(knacks, remainingChoices);
  [equipment, remainingChoices] = getEquipment(knacks, remainingChoices);
  const coins = 5 + remainingChoices * 20;
  // TODO: don't give out items above ¢50 unless less items
  // TODO: Shields, ammo, two weapons if ranged weapon, heavy armor, money
  // TODO: don't give armor to casters
  return {
    weapons,
    wearing,
    equipment,
    coins,
  };
}

export default function generateCharacter() {
  const gender = getGender();
  let firstNames = shuffle([...names.first]);
  if (gender === 'm') firstNames = firstNames.filter(n => n.gender !== 'f');
  else if (gender === 'f')
    firstNames = firstNames.filter(n => n.gender !== 'm');
  const firstName = firstNames[0].name;
  const lastName = shuffle([...names.last])[0];
  const level = 1;
  const folk = getFolk();
  const abilities = getAbilites();
  const knacks = getKnacks(abilities);
  const items = getItems(knacks);
  // TODO make background informed by knacks (ie. no fortune teller unless magic or another mystical knack?)
  const background = getBackground();
  return {
    firstName,
    lastName,
    gender,
    level,
    folk,
    background,
    abilities: abilities.map(a => ({ name: a })),
    knacks,
    items,
  };
}
