function createKnackString(knack) {
  const kStr = `${knack.display}`;
  return knack.level > 1 ? `${kStr} (${knack.level})` : kStr;
}

function createKnackList(list, verb) {
  let knackStr = '';
  if (list.length === 1) {
    knackStr = `${verb} ${createKnackString(list[0])}`;
  } else if (list.length === 2) {
    knackStr = `${verb} ${createKnackString(list[0])} and ${createKnackString(
      list[1]
    )}`;
  } else if (list.length > 2) {
    knackStr += `${verb} `;
    for (let x = 0; x < list.length; x++) {
      if (x + 1 < list.length) {
        knackStr += `${createKnackString(list[x])}, `;
      } else {
        knackStr += `and ${createKnackString(list[x])}`;
      }
    }
  }
  return knackStr;
}

function createItemString(item) {
  const f = item.name.toLowerCase()[0];
  const a =
    f === 'a' || f === 'e' || f === 'i' || f === 'o' || f === 'u' ? 'an' : 'a';
  return `${a} ${item.name}`;
}

export default function characterBlurb({
  firstName,
  lastName,
  gender,
  level,
  folk,
  background,
  abilities,
  knacks,
  items,
  coins,
}) {
  const a = `${abilities[0].name} and ${abilities[1].name}`;
  const first = `${firstName} ${lastName} is a ${a} ${folk} ${background}.`;
  const pronouns =
    gender === 'f'
      ? ['She', 'her']
      : gender === 'm'
      ? ['He', 'his']
      : ['They', 'their'];

  const processedKnacks = [[], [], []];
  const have = gender === 't' ? 'have' : 'has';
  const are = gender === 't' ? 'are' : 'is';
  const can = 'can';

  const knackKeys = Object.keys(knacks);
  for (let x = 0; x < knackKeys.length; x++) {
    if (knacks[knackKeys[x]].verb === 'have') {
      processedKnacks[0].push(knacks[knackKeys[x]]);
    } else if (knacks[knackKeys[x]].verb === 'are') {
      processedKnacks[1].push(knacks[knackKeys[x]]);
    } else if (knacks[knackKeys[x]].verb === 'can') {
      processedKnacks[2].push(knacks[knackKeys[x]]);
    }
  }

  const haveStr = createKnackList(processedKnacks[0], have);
  const areStr = createKnackList(processedKnacks[1], are);
  const canStr = createKnackList(processedKnacks[2], can);

  let knacksString = '';
  if (haveStr.length && areStr.length && canStr.length) {
    knacksString = `${haveStr}, ${areStr}, and ${canStr}`;
  } else if (haveStr.length && areStr.length) {
    knacksString = `${haveStr} and ${areStr}`;
  } else if (haveStr.length && canStr.length) {
    knacksString = `${haveStr} and ${canStr}`;
  } else if (areStr.length && canStr.length) {
    knacksString = `${areStr} and ${canStr}`;
  } else {
    knacksString = `${haveStr}${areStr}${canStr}`;
  }

  const second = `${pronouns[0]} ${knacksString}.`;

  let wearString = '';
  let wieldString = '';
  let carryString = '';

  if (items.wearing.length === 1) {
    wearString = `wears ${items.wearing[0].name}`;
  }

  if (items.weapons.length === 1) {
    wieldString = `wields ${createItemString(items.weapons[0])}`;
  } else if (items.weapons.length === 2) {
    wieldString = `wields ${createItemString(
      items.weapons[0]
    )} and ${createItemString(items.weapons[1])}`;
  } else if (items.weapons.length > 2) {
    wieldString = `wields `;
    for (let x = 0; x < items.weapons.length; x++) {
      if (x + 1 < items.weapons.length) {
        wieldString += `${createItemString(items.weapons[x])}, `;
      } else {
        wieldString += `and ${createItemString(items.weapons[x])}`;
      }
    }
  }

  if (items.equipment.length === 1) {
    carryString = `${have} ${createItemString(items.equipment[0])} `;
  } else if (items.equipment.length > 1) {
    carryString = `${have} `;
    for (let x = 0; x < items.equipment.length; x++) {
      carryString += `${createItemString(items.equipment[x])}, `;
    }
  }
  wieldString = wieldString.length ? ` and ${wieldString}` : '';
  const third = `${firstName} ${wearString}${wieldString}.`;
  const fourth = `${pronouns[0]} ${carryString}and ¢${items.coins} to ${pronouns[1]} name.`;

  return `${first} ${second} ${third} ${fourth}`;
}
