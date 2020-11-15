import Knacks from '../../../types/Knacks';

export const parseKnackRawMD: Knacks = (knacksMd: string) => {
  // Produces knack rules by processing pages/rulebook/knacks.mdx line by line
  // Could be improved in myriad ways
  const knackAttributes = [
    ['**Effect:** ', 'effect'],
    ['**Level:** ', 'level'],
    ['**Note:** ', 'note'],
  ];
  let knacks = {};
  let currentCategory = null;
  let currentKnack = null;
  let currentKnackContent = {};

  knacksMd.split('\n').map(line => {
    if (line.startsWith('## ')) {
      currentCategory = line.replace(/^[\s#]+/g, '');
    } else if (line.startsWith('### ')) {
      if (currentKnack) {
        // Write out the current knack and reset state
        knacks[currentKnack] = currentKnackContent;
        currentKnackContent = {};
      }

      currentKnack = line.replace(/^[\s#]+/g, '');
      currentKnackContent['category'] = currentCategory;
      currentKnackContent['content'] = '';
    } else if (currentKnack) {
      currentKnackContent['content'] += line;
      currentKnackContent['content'] += '\n';
    }

    knackAttributes.map(([pattern, key]) => {
      if (line.startsWith(pattern)) {
        currentKnackContent[key] = line.replace(pattern, '');
      }
    });
  });

  // Write out the last knack
  knacks[currentKnack] = currentKnackContent;

  const magicSchools = ['Spiritism', 'Theurgy', 'Theumaturgy', 'Deceit'];
  magicSchools.map(school => {
    knacks['Spellcasting (' + school + ')'] = knacks['Spellcasting'];
  });
  return knacks;
};
