import prisma from '../../../../lib/prisma';
import SidebarLayout from '../../../../components/SidebarLayout';
import SidebarList from '../../../../components/SidebarList';
import CustomLink from '../../../../components/CustomLink';

export default function Entry({ entry, campaignId, chapters }) {
  const formattedChapters = chapters.map(chapter => ({
    href: `/stories/${campaignId}/chapter/${chapter.id}`,
    ...chapter,
  }));
  const sidebar = <SidebarList title={'Chapters'} pages={formattedChapters} />;
  return (
    <SidebarLayout sidebar={sidebar}>
      <h1>{entry.title}</h1>
      <pre>By: {entry.author.name}</pre>
      <br />
      <p>{entry.content}</p>
      <CustomLink href={`/stories/${campaignId}`}>«</CustomLink>
    </SidebarLayout>
  );
}

export async function getServerSideProps({ params }) {
  // TODO protect against can't see
  const campaignId = params.id;
  const entry = await prisma.journalEntry.findUnique({
    where: {
      id: Number(params.chapterId) || -1,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  const chapters = await prisma.journalEntry.findMany({
    where: {
      campaignId: Number(campaignId),
      isPublished: true,
    },
  });
  entry.createdAt = entry.createdAt.toString();
  entry.updatedAt = entry.updatedAt.toString();
  chapters.map(c => {
    c.createdAt = c.createdAt.toString();
    c.updatedAt = c.updatedAt.toString();
  });
  return { props: { entry, campaignId, chapters } };
}
