import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const session = await getSession({ req });

  const { campaignId, characterId } = req.body;
  console.log(prisma);

  const result = await prisma.campaignCharacter.create({
    data: {
      campaign: {
        connect: {
          id: Number(campaignId),
        },
      },
      character: {
        connect: {
          id: Number(characterId),
        },
      },
    },
  });

  res.json(result);
}
