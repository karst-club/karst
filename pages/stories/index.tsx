import generateCharacter from '../../lib/characterGenerator';
import generateStory from '../../lib/storyGenerator';
import SidebarLayout from '../../components/SidebarLayout';
import Character from '../../components/Character';

export default function Index({ character, story }) {
  return (
    <SidebarLayout sidebar={''}>
      <h1>A Random...</h1>
      <h2>Story</h2>
      <p>{story}</p>
      <h2>Character</h2>
      <Character character={character} />
    </SidebarLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      character: generateCharacter(),
      story: generateStory(),
    },
  };
}

/*
import { getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';
import CharacterBlurb from '../../components/CharacterBlurb';
import NewCharacter from '../../components/NewCharacter';
import CreateStory from '../../components/CreateStory';
import CustomLink from '../../components/CustomLink';
import UserStatus from '../../components/UserStatus';


export default function Index({ campaigns, characters }) {
  let sidebar = (
    <>
      <br />
      <UserStatus />
      <p>Log in or create a campaign to get started.</p>
    </>
  );
  if (campaigns.length) {
    sidebar = (
      <>
        <br />
        <NewCharacter />
      </>
    );
  }
  return (
    <SidebarLayout sidebar={sidebar}>
      <h1>Stories & Characters</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '50%' }}>
          <h2>Folk</h2>
          {characters.map(c => (
            <CharacterBlurb key={c.name} character={c} />
          ))}
        </div>
        <div style={{ width: '50%' }}>
          <h2>Tales</h2>
          <ul>
            {campaigns.map(entry => (
              <li key={entry.id}>
                <CustomLink href={`/stories/${entry.id}`}>
                  {entry.title}
                </CustomLink>
              </li>
            ))}
          </ul>
          <br />
          <h3>Create New Story</h3>
          <CreateStory />
        </div>
      </div>
    </SidebarLayout>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  let campaigns = [];
  let characters = [];
  if (session) {
    campaigns = await prisma.campaign.findMany({
      where: {
        users: {
          some: {
            user: {
              email: session.user.email,
            },
          },
        },
      },
    });
    characters = await prisma.character.findMany({
      where: {
        player: {
          email: session.user.email,
        },
      },
    });
  }
  return { props: { campaigns, characters } };
}
*/
