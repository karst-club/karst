import fs from 'fs';
import matter from 'gray-matter';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import generateCharacter from '../../lib/characterGenerator';
import generateStory from '../../lib/storyGenerator';
import CustomLink from '../../components/CustomLink';
import Character from '../../components/Character';
import SidebarLayout from '../../components/SidebarLayout';
import { worldbookFilePaths, WORLDBOOKS_PATH } from '../../lib/mdxUtils';
import SidebarList from '../../components/SidebarList';

const components = {
  a: CustomLink,
  Head,
};

export default function WorldbookPage({ character, story, pages }) {
  return (
    <SidebarLayout sidebar={<SidebarList title="Worldbooks" pages={pages} />}>
      <div className="post-header">
        <h1>Inspiration</h1>
      </div>
      <main>
        <h2>A Story</h2>
        <p>{story}</p>
        <h2>A Character</h2>
        <Character character={character} />
      </main>

      <style jsx>{`
        .post-header h1 {
          margin-bottom: 0;
        }

        .post-header {
          margin-bottom: 2rem;
        }
        .description {
          opacity: 0.6;
        }
      `}</style>
    </SidebarLayout>
  );
}

export const getServerSideProps = async ({ params }) => {
  /* 
  const r = thing => thing[Math.floor(Math.random() * thing.length)];
  // a tale of [emotion]: [quest] involving [2 characters] featuring [feature] and complicated by [complication].

  // Start with the quest.
  //   Type, specifics
  //   location
  //   complication

  const songs = ['ballad', 'requiem'];

  const emotions = [
    'Love',
    'Loss',
    'Greed',
    'Glory',
    'Respect',
    'Temptation',
    'Wonder',
    'Vengeance',
  ];

  const characters = [
    'a Merchant',
    'a Captain',
    'an Artisan',
    'a Fisher',
    'a Drover',
    'a Magistrate',
    'a Laborer',
    'a Sellsword',
    'a Scholar',
    'a Sorcerer',
    'a Spiritist',
    'an Orphan',
    'an Explorer',
  ];

  const groups = [
    'a merchant vessel',
    'a pirate crew',
    'an expidition',
    'a village',
    'a guild',
    'a thaumaturgical union',
    'a cult',
  ];

  const items = [
    'bolts of rare fabric',
    'a shipment of honied dontlers',
    'a large sum of coins',
    'a unusual key',
    'a curious contraption',
    'an old relic',
    'a sentimental locket',
    'a barrel of sky juice',
    'a flock of geese',
    'a small sailboat',
  ];

  const compulsions = [
    'beseeches the characters to',
    'implores the characters to',
    'demands that the characters',
    'will pay the characters to',
    'suggests that the characters',
    'asks the characters to',
  ];

  const locations = [
    'an abandoned outpost of the First Serpos Empire',
    'the ruins of the Stripe-furred folk',
    'a pirate lair',
    'a recently abandoned settlement',
    'an old Veldling colony',
    'a burial site',
    'an unvisited shore',
    'a shipwreck',
    'a small fishing village',
    'fathomless caves',
  ];

  // [character] asks the characters to [quest]
  // investigate a disappearance
  const charGroup = () => (Math.random() > 0.5 ? r(characters) : r(groups));

  const charGroupItem = () => {
    const rn = Math.random();
    return rn > 0.666 ? r(characters) : rn > 0.333 ? r(groups) : r(items);
  };

  const quests = [
    `investigate the disappearance of ${charGroupItem()}`,
    `recover ${r(items)} that has been lost`, // from character, group or location
    `find a missing ${r(characters).split(' ')[1]}`,
    `acquire ${r(items)}`, // item
    `solve a dispute between ${charGroup()} and ${charGroup()}`, // between characters or groups
    `guard ${charGroupItem()}`, // character group or item  // from
    `broker a trade between ${charGroup()} and ${charGroup()}`, // between
    `apprehend ${charGroup()}`, // add an adjective?
    `defeat a monster or adversary`, // monster or character
    `solve a mystery`, // involving???
    `escape a danger`, // danger
    `win a competition against ${charGroup()}`, // competition of
    `discover something new`, // involving ???
  ];

  const complications = [
    'a rivalry',
    'natural obstacles',
    'magical obstacles',
    'authority',
    'public sentiment',
    'cultural mores',
  ];

  const theme = `A ${r(songs)} of ${r(emotions)}:`;

  const impetus =
    Math.round(Math.random()) === 0
      ? `${r(characters)} ${r(compulsions)}`
      : `The characters must`;

  //const story = `A tale of ${r(emotions)}: ${r(quests)} involving ${r(characters)} and ${r(characters)} featuring ${r(locations)} and complicated by ${r(complications)}.`;

  const story = `${theme} ${impetus} ${r(quests)}`;
 */

  const pages = worldbookFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(WORLDBOOKS_PATH, filePath));
    const { data } = matter(source);
    return {
      href: `/worldbooks/${filePath.replace(/\.mdx?$/, '')}`,
      ...data,
    };
  });

  return {
    props: {
      character: generateCharacter(),
      story: generateStory(),
      pages: [
        { href: '/worldbooks/inspiration', title: 'Inspiration' },
        ...pages,
      ],
    },
  };
};
