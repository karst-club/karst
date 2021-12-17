export default function characterBlurb({
  name,
  level,
  folk,
  background,
  abilities,
  knacks,
  items,
  coins,
}) {
  const a = `${abilities[0].name} and ${abilities[1].name}`;
  const first = `${name} is a ${a} ${folk} ${background}.`;

  const fKnacks = Object.keys(knacks).map(k => {
    const knack = knacks[k];
    const kStr = `${knack.verb} ${knack.display}`;
    return knack.level > 1 ? `${kStr} (${knack.level})` : kStr;
  });
  let knackString = '';
  for (let x = 0; x < fKnacks.length; x++) {
    if (x + 1 < fKnacks.length) {
      knackString += `${fKnacks[x]}, `;
    } else {
      knackString += `and ${fKnacks[x]}`;
    }
  }
  const second = `They ${knackString}.`;

  // TODO Items

  return `${first} ${second}`;
}
