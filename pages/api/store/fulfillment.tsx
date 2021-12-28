const stripe = require('stripe')(process.env.STRIPE_SECRET_API_KEY);
import getRawBody from 'raw-body';
import nodemailer from 'nodemailer';
import { createHmac } from 'crypto';
import prisma from '../../../lib/prisma';

export const config = {
  api: {
    bodyParser: false,
  },
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const purchaseHashSecret = process.env.SHOP_PURCHASE_HASH_SECRET;

async function findItem(session) {
  const items = await stripe.checkout.sessions.listLineItems(session.id);
  console.log(items);
  const products = items.data.map(i => i.price.product);
  const product = await prisma.shopItem.find({
    where: {
      productId: products[0],
    },
  });
  return product[0];
  /*
  {
  object: 'list',
  data: [
    {
      id: 'li_1235',
      object: 'item',
      amount_subtotal: 2000,
      amount_total: 2000,
      currency: 'usd',
      description: 'Karst - PDF',
      price: [Object],
      quantity: 1
    }
  ],
  has_more: false,
  url: '/v1/checkout/sessions/cs_test_12345/line_items'
}
*/
}

async function recordPurchase(recipient, product) {
  const user = await prisma.User.findUnique({
    where: { email: recipient },
  });
  const hmac = createHmac('sha256', purchaseHashSecret);
  hmac.update(`${recipient}:${product.slug}`);
  const purchaseHash = hmac.digest('hex');
  const result = await prisma.Purchase.create({
    data: {
      user: {
        connect: { id: user.id },
      },
      item: {
        connect: { productId: product.productId },
      },
      downloadCount: 0,
      purchaseHash,
    },
  });
  return result;
}

async function sendMail(recipient, product, purchase) {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: 'caz <caz@vonkow.com>',
    to: `${recipient}`,
    subject: `Thank you for your purchase of ${product.name}`,
    text: `Thank you for purchasing ${product.name}! Your download hash is ${purchase.purchaseHash}`,
    html: `<h1>Thank you for purchasing ${product.name}! Your download hash is ${purchase.purchaseHash}</h1>`,
  });
  console.log(`sent ${info.messageId}`);
}

async function fulfillOrder(session) {
  const recipient = session.customer_details.email;
  const product = await findItem(session);
  const purchase = await recordPurchase(recipient, product);
  await sendMail(recipient, product, purchase);
  // Log purchase // TODO save user and item ids in db
  // hash email and product return
  // Email download link
  // Send request to physical fulfillment if needed
  // await sendMail(recipient); // TODO send in items.
  //console.log(session);

  // TODO
  /*
  {
  id: 'cs_test_12345',
  object: 'checkout.session',
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 2000,
  amount_total: 3000,
  automatic_tax: { enabled: false, status: null },
  billing_address_collection: null,
  cancel_url: 'http://localhost:3000/store/?canceled=true',
  client_reference_id: null,
  consent: null,
  consent_collection: null,
  currency: 'usd',
  customer: 'cus_12345',
  customer_details: {
    email: 'xxx@yyy.com',
    phone: null,
    tax_exempt: 'none',
    tax_ids: []
  },
  customer_email: null,
  expires_at: 1640756574,
  livemode: false,
  locale: null,
  metadata: {},
  mode: 'payment',
  payment_intent: 'pi_12345',
  payment_method_options: {},
  payment_method_types: [ 'card' ],
  payment_status: 'paid',
  phone_number_collection: { enabled: false },
  recovered_from: null,
  setup_intent: null,
  shipping: {
    address: {
      city: 'city',
      country: 'US',
      line1: 'lin1',
      line2: null,
      postal_code: '90210',
      state: 'ST'
    },
    name: 'caz'
  },
  shipping_address_collection: { allowed_countries: [ 'US', 'CA' ] },
  shipping_options: [
    {
      shipping_amount: 1000,
      shipping_rate: 'shr_12345'
    }
  ],
  shipping_rate: 'shr_12345',
  status: 'complete',
  submit_type: null,
  subscription: null,
  success_url: 'http://localhost:3000/store/?success=true&item=book_NA',
  total_details: { amount_discount: 0, amount_shipping: 1000, amount_tax: 0 },
  url: null
}
*/
}

export default async function handler(req, res) {
  const payload = await getRawBody(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await fulfillOrder(session);
  }

  res.status(200).end();
}
