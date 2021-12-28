import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  console.log(req.query);
  const { hash } = req.query;
  const purchases = await prisma.purchase.findMany({
    where: { purchaseHash: hash },
  });
  const purchase = purchases[0];
  const user = await prisma.user.findUnique({
    where: { id: purchase.userId },
  });
  const item = await prisma.shopItem.findUnique({
    where: { id: purchase.itemId },
  });
  //console.log(item);

  res.json({
    email: user.email,
    item: item.name,
  });
  //res.status(200).end();
  // Look up purchase history for email & itemKey.
  // (maybe) look up any presigned urls that already exist and grab if not expired?
  // Generate presigned url for item.
  // bump download count for item.
  // return a redirect to the presigned url.
}
