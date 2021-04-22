import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  // TODO GET, POST, PUT, DELETE, ?HEAD

  const session = await getSession({ req });

  const { name, about, folk, level, abilities, knacks, items } = req.body;
  const coins = 1;

  const character = await prisma.character.create({
    data: {
      name,
      about,
      folk,
      coins,
      level,
      player: { connect: { email: session.user.email } },
      abilities: { create: abilities },
      knacks: { create: knacks },
      items: { create: items },
    },
  });

  res.json({ character });
}
