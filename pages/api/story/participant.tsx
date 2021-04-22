import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const session = await getSession({ req });
  // TODO verify that session user has permissions

  const { campaignId, email } = req.body;

  const result = await prisma.participant.create({
    data: {
      role: 'player',
      author: {
        connect: { email },
      },
      campaign: {
        connect: {
          id: Number(campaignId),
        },
      },
    },
  });

  res.json(result);
}
