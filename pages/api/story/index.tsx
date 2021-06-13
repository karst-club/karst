import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const session = await getSession({ req });

  const { title } = req.body;

  const story = await prisma.campaign.create({
    data: {
      title,
    },
  });

  const campaignUser = await prisma.campaignUser.create({
    data: {
      role: 'narrator',
      user: {
        connect: {
          email: session.user.email,
        },
      },
      campaign: {
        connect: {
          id: story.id,
        },
      },
    },
  });
  story.createdAt = story.createdAt.toString();
  story.updatedAt = story.updatedAt.toString();
  res.json(story);
}
