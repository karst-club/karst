export default async function handler(req, res) {
  console.log(req.query);
  const { email, itemKey } = req.query;
  res.status(200).end();
  // Look up purchase history for email & itemKey.
  // (maybe) look up any presigned urls that already exist and grab if not expired?
  // Generate presigned url for item.
  // bump download count for item.
  // return a redirect to the presigned url.
}
