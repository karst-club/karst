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

  const participant = await prisma.participant.create({
    data: {
      role: 'narrator',
      author: {
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

  res.json(story);
}
