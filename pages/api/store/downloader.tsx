import prisma from '../../../lib/prisma';
import AWS from 'aws-sdk';

const spacesEndpoint = new AWS.Endpoint('sfo3.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_ACCESS_KEY,
  secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY,
});

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
  if (item.slug === 'pdf') {
    const url = s3.getSignedUrl('getObject', {
      Bucket: 'karst',
      Key: 'Karst.pdf',
      Expires: 60 * 5,
    });
    res.redirect(303, url);
  } else {
    res.json({
      email: user.email,
      item: item.name,
    });
  }
  //res.status(200).end();
  // Look up purchase history for email & itemKey.
  // (maybe) look up any presigned urls that already exist and grab if not expired?
  // Generate presigned url for item.
  // bump download count for item.
  // return a redirect to the presigned url.
}
