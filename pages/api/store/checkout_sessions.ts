const stripe = require('stripe')(process.env.STRIPE_SECRET_API_KEY);

const items = {
  pdf: {
    line_items: [
      {
        price: process.env.SHOP_PDF_PRICE,
        quantity: 1,
      },
    ],
  },
  book_NA: {
    line_items: [
      {
        price: process.env.SHOP_HARDCOVER_PRICE,
        quantity: 1,
      },
    ],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    shipping_options: [
      { shipping_rate: process.env.SHOP_STANDARD_SHIPPING_RATE },
    ],
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { itemKey } = req.body;
    try {
      const item = items[itemKey];
      const session = await stripe.checkout.sessions.create({
        ...item,
        mode: 'payment',
        success_url: `${req.headers.origin}/store/?success=true&item=${itemKey}`,
        cancel_url: `${req.headers.origin}/store/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
