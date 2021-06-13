import { getSession, useSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';
import SidebarLayout from '../../../components/SidebarLayout';
import AddParticipant from '../../../components/AddParticipant';
import AddCampaignCharacter from '../../../components/AddCampaignCharacter';
import CustomLink from '../../../components/CustomLink';

export default function Story({ campaign, chapters }) {
  const [session] = useSession();
  const baseUrl = `/stories/${campaign.id}`;
  const sidebar = (
    <>
      <h3>Hello, {session && session.user.name}</h3>
      <h2>Authors</h2>
      <ul>
        {campaign.users.map((u, i) => (
          <li key={`u-${i}`}>{u.user.name}</li>
        ))}
      </ul>
      <AddParticipant />
    </>
  );

  return (
    <SidebarLayout sidebar={sidebar}>
      <h1>{campaign.title}</h1>
      <div className="columns">
        <div className="column">
          <h2>Chapters</h2>
          <ul>
            {chapters.map(c => (
              <li key={c.id}>
                <CustomLink href={`${baseUrl}/chapter/${c.id}`}>
                  {c.title}
                </CustomLink>
              </li>
            ))}
          </ul>
          <CustomLink href={`${baseUrl}/write`}>+ Write Chapter</CustomLink>
        </div>
        <div className="column">
          <h2>Characters</h2>
          <ul>
            {campaign.characters.map((c, i) => (
              <li key={`c-${i}`}>
                <CustomLink href={`/stories/characters/${c.character.id}`}>
                  {c.character.name}
                </CustomLink>
              </li>
            ))}
          </ul>
          <AddCampaignCharacter />
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          .columns {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .column {
            width: 50%;
          }
        }
      `}</style>
    </SidebarLayout>
  );
}

export async function getServerSideProps({ req, params }) {
  const session = await getSession({ req });
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: Number(params.id) || -1,
    },
    include: {
      users: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      characters: {
        select: {
          character: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  const chapters = await prisma.journalEntry.findMany({
    where: {
      campaignId: Number(params.id) || -1,
      OR: [
        { isPublished: true },
        {
          author: {
            name: session.user.name,
          },
        },
      ],
    },
  });
  return { props: { campaign, chapters } };
}
