import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';
import Character from '../../../components/Character';
import CharacterBlurb from '../../../components/CharacterBlurb';
import CustomLink from '../../../components/CustomLink';
import SidebarLayout from '../../../components/SidebarLayout';

export default function CharacterSheet({ character, characters }) {
  const sidebar = (
    <>
      <br />
      <CustomLink href="/stories">
        <h3>« Stories</h3>
      </CustomLink>
      <h2>Other Characters</h2>
      {characters
        .filter(c => c.name !== character.name)
        .map(c => (
          <CharacterBlurb character={c} />
        ))}
    </>
  );
  return (
    <SidebarLayout sidebar={sidebar}>
      <Character character={character} title={true} />
      TODO Add ways to level up, get items, and get hurt?
    </SidebarLayout>
  );
}

export async function getServerSideProps({ req, params }) {
  // TODO validate state with session
  const session = await getSession({ req });

  const character = await prisma.character.findUnique({
    where: {
      id: Number(params.id) || -1,
    },
    include: {
      abilities: true,
      knacks: true,
      items: true,
      player: {
        select: {
          name: true,
        },
      },
    },
  });

  const characters = await prisma.character.findMany({
    where: { player: { email: session.user.email } },
  });

  return { props: { character, characters } };
}
