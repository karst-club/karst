import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
import SidebarLayout from '../../components/SidebarLayout';

// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PreviewPage() {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      window.alert('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      window.alert(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      );
    }
  }, []);

  return (
    <SidebarLayout
      sidebar={
        <>
          <h1>Newsletter</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: `
            <!-- Begin Mailchimp Signup Form -->
            <link href="//cdn-images.mailchimp.com/embedcode/slim-10_7_dtp.css" rel="stylesheet" type="text/css">
            <div id="mc_embed_signup">
            <form action="https://club.us20.list-manage.com/subscribe/post?u=42a41a11b094ccd3a97207f0d&amp;id=deaedc24b7" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
              <div id="mc_embed_signup_scroll">
	              <label for="mce-EMAIL">Subscribe the Karst Newsletter</label>
	              <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" style="max-width: 80%; display: inline" required>
	              <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button" style="height: 2.25em; margin-top: 1em;">
                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_42a41a11b094ccd3a97207f0d_deaedc24b7" tabindex="-1" value=""></div>
                <br/><br/>
              </div>
            </form>
          </div>
          <!--End mc_embed_signup-->
        `,
            }}
          />
        </>
      }
    >
      <h1>The Historical Societey Gift Shop</h1>
      <p>
        Welcome to the Gift Shop. Here, you can purchase the complete edition of
        Karst in PDF or Hardcover. All proceeds go to the funding of futher
        explorations into the Karst Archipelago. Sign up for our newsletter to
        stay informed and abreast of new discoveries and publications about the
        Archipelago.
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '16em' }}>
          <form action="/api/store/checkout_sessions" method="POST">
            <h2 style={{ textAlign: 'center' }}>PDF</h2>
            <img
              style={{ maxWidth: '16em' }}
              src="/images/Cover-small.png"
              alt="Karst PDF Cover"
            />
            <input type="hidden" name="itemKey" value="pdf" />
            <section>
              <button type="submit" role="link">
                Buy the PDF
              </button>
            </section>
            <br />
            <p>
              Karst, the Complete Edition, in digital format. This illustrated
              PDF contains 96 pages of art, rules, playing advice, and
              information about the Karst Archipelago. Included within its pages
              are the adventure Shipwrecked on Gygalos Island and Things to Do
              in Porta Cortu, a mini-gazzetteer.
            </p>
          </form>
        </div>
        <div style={{ width: '16em' }}>
          <form action="/api/store/checkout_sessions" method="POST">
            <h2 style={{ textAlign: 'center' }}>Hardcover</h2>
            <img
              style={{ maxWidth: '16em' }}
              src="/images/Cover-small.png"
              alt="Karst PDF Cover"
            />
            <input type="hidden" name="itemKey" value="book_NA" />
            <section>
              <span style={{ textAlign: 'center', paddingBottom: '0.5em' }}>
                COMING SOON
              </span>
              {/*<button type="submit" role="link">
                Buy the Hardcover Edition
              </button>*/}
            </section>
            <br />
            <p>
              Karst, the Complete Edition, in a deluxe hardcover format. This
              limited-edition hardback tome is sustainably printed by Hemlock,
              one of North America's most progressive and sustainable print
              providers. Purchase includes the PDF edition.
            </p>
          </form>
        </div>
      </div>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 16em;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </SidebarLayout>
  );
}
