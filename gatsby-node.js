let resolver;
let knackPagePromise = new Promise(resolve => {
  resolver = resolve;
});

exports.onCreateNode = ({ node }) => {
  // Required to ensure that the knack MDX is available for sourceNodes
  if (node.relativePath === 'rulebook/knacks.mdx') {
    resolver();
  }
};

// https://spectrum.chat/gatsby-js/general/why-is-sourcenodes-hook-called-before-all-oncreatenode-callbacks-are-finished~cf2ba3a2-c463-4df0-b691-99c266cf0a43?m=MTU4Mjc0MzYyMDI5Mw==
exports.sourceNodes = ({ actions, createContentDigest, getNodesByType }) => {
  const { createNode } = actions;
  const createKnackNode = knackContent => {
    const knackMeta = {
      id: knackContent.name,
      parent: null,
      children: [],
      internal: {
        type: `Knack`,
        mediaType: `text/json`,
        content: JSON.stringify(knackContent),
        contentDigest: createContentDigest(knackContent),
      },
    };

    const node = Object.assign({}, knackContent, knackMeta);
    createNode(node);
  };

  return knackPagePromise.then(() => {
    const pageNodes = getNodesByType('File');
    const knackPageContent = pageNodes
      .filter(node => node.relativePath === 'rulebook/knacks.mdx')
      .pop().internal.content;

    //const knackAttributes = [
    //['**Effect:** ', 'effect'],
    //['**Level:** ', 'level'],
    //['**Note:** ', 'note'],
    //];
    let currentCategory = null;
    let currentKnack = null;
    let currentKnackContent = {};

    knackPageContent.split('\n').map(line => {
      if (line.startsWith('## ')) {
        currentCategory = line.replace(/^[\s#]+/g, '');
      } else if (line.startsWith('### ')) {
        if (currentKnack) {
          // Write out the current knack and reset state
          createKnackNode(currentKnackContent);
          currentKnackContent = {};
        }

        currentKnack = line.replace(/^[\s#]+/g, '');
        currentKnackContent.name = currentKnack;
        currentKnackContent.category = currentCategory;
        currentKnackContent.content = '';
        currentKnackContent.effect = '';
        currentKnackContent.prerequisite = '';
      } else if (currentKnack && currentKnackContent.content === '') {
        currentKnackContent.content = line;
      } else if (currentKnack && currentKnackContent.effect === '') {
        currentKnackContent.effect = line;
      } else if (currentKnack && currentKnackContent.prerequisite === '') {
        currentKnackContent.prerequisite = line;
      }

      //knackAttributes.map(([pattern, key]) => {
      //if (line.startsWith(pattern)) {
      //currentKnackContent[key] = line.replace(pattern, '');
      //}
      //});
    });

    // Write out the last knack
    createKnackNode(currentKnackContent);
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions;

  createFieldExtension({
    name: `defaultZero`,
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return 0;
          }
          return source[info.fieldName];
        },
      };
    },
  });
  createFieldExtension({
    name: `defaultOne`,
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return 1;
          }
          return source[info.fieldName];
        },
      };
    },
  });

  const typeDefs = `
    type Knack implements Node @dontInfer {
      id: String!
      category: String!
      content: String!
      effect: String!
      level: String
      note: String
      prerequisite: String
    }
    type Mdx implements Node @dontInfer {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String!
      icon: String!
      menu_order: Int @defaultZero
      sheet: CharacterSheet
    }
    type CharacterSheet {
      name: String!
      player: String!
      species: Species
      hook: String!
      level: Int!
      xp: Int!
      attributes: CharacterAttributes!
      max_hp: Int!
      hp: Int!
      coins: Int!
      knacks: [CharacterKnack]!
      items: [String]
    }
    type CharacterKnack {
      knack: Knack! @link
      levels: Int @defaultOne
      specialty: String
    }
    enum Species {
      Eekhorn
      Grevling
      Lagartos
      Serpos
      Veldling
      Visita
    }
    type CharacterAttributes {
      str: Int!
      dex: Int!
      con: Int!
      int: Int!
      wis: Int!
      cha: Int!
    }
  `;
  createTypes(typeDefs);
};
