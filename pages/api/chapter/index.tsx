import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const session = await getSession({ req });

  const { campaignId, title, content } = req.body;
  const result = await prisma.entry.create({
    data: {
      author: {
        connect: {
          email: session.user.email,
        },
      },
      title,
      published: true,
      shared: true,
      content,
      campaign: {
        connect: { id: Number(campaignId) },
      },
    },
  });
  res.json(result);
}
