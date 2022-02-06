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
  const products = items.data.map(i => i.price.id); // TODO fix items to have product not price in them>
  const product = await prisma.shopItem.findMany({
    where: {
      productId: products[0],
    },
  });
  return product[0];
}

async function recordPurchase(recipient, product) {
  let user = await prisma.user.findUnique({
    where: { email: recipient },
  });
  if (user === null) {
    user = await prisma.user.create({
      data: {
        email: recipient,
      },
    });
  }
  const hmac = createHmac('sha256', purchaseHashSecret);
  hmac.update(`${recipient}:${product.slug}`);
  const purchaseHash = hmac.digest('hex');
  const result = await prisma.purchase.create({
    data: {
      user: {
        connect: { id: user.id },
      },
      item: {
        connect: { id: product.id },
      },
      downloadCount: 0,
      purchaseHash,
    },
  });
  return result;
}

async function sendMail(recipient, product, purchase) {
  const email_templates = {
    pdf: {
      text: `Thank you for purchasing the digital edition of Karst! Your download link is ${process.env.BASE_URL}/api/store/downloader?hash=${purchase.purchaseHash}`,
      html: `<h1>Thank you for purchasing the digital edition of Karst!</h1> <p>Your <a href="${process.env.BASE_URL}/api/store/downloader?hash=${purchase.purchaseHash}">download link</a> is ready.</p>`,
    },
    book_NA: {
      text: `Thank you for purchasing the hardcover edition of Karst! You will receive another email and a link for the digital edition when it has shipped.`,
      html: `<h1>Thank you for purchasing the hardcover edition of Karst!</h1><p>You will receive another email and a link for the digital edition when it has shipped.</p>`,
    },
  };
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const { html, text } = email_templates[product.slug];
  let info = await transporter.sendMail({
    from: `The Karst Archipelago Historical Society <${process.env.SEND_ADDRESS}>`,
    to: `${recipient}`,
    subject: `Thank you for your purchase of ${product.name}`,
    text,
    html,
  });
  //console.log(`sent ${info.messageId}`);
}

async function fulfillOrder(session) {
  const recipient = session.customer_details.email;
  const product = await findItem(session);
  const purchase = await recordPurchase(recipient, product);
  await sendMail(recipient, product, purchase);
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
