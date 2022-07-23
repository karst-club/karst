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
          <div className="sidebar-image">
            <img src="/images/store.png" alt="Serpos shopkeeper." />
          </div>
          <br />
          <h1 style={{ marginBottom: '0' }}>Newsletter</h1>
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
      <h1>The Historical Society Gift Shop</h1>
      <p>
        Welcome to the Gift Shop. Here, you can purchase the complete edition of
        Karst in PDF or Hardcover. All proceeds go to the funding of futher
        explorations into the Karst Archipelago. Sign up for our newsletter to
        stay informed and abreast of new discoveries and publications about the
        Archipelago.
      </p>
      <div className="shop-container">
        {/**<div className='shop-listing'>
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
        </div>*/}
        {/*<div className='shop-listing'>*/}
        <form action="/api/store/checkout_sessions" method="POST">
          <h2 style={{ textAlign: 'center' }}>Hardcover</h2>
          <img
            style={{ maxWidth: '16em', margin: '0 auto', display: 'block' }}
            src="/images/Cover-small.png"
            alt="Karst PDF Cover"
          />
          <input type="hidden" name="itemKey" value="book_NA" />
          <section>
            {/*<span style={{ textAlign: 'center', paddingBottom: '0.5em' }}>
                COMING SOON
              </span>*/}
            <button type="submit" role="link">
              Buy the Hardcover Edition
            </button>
          </section>
          <br />
          <p>
            Karst, the Complete Edition, in a deluxe hardcover format. This
            illustrated tome contains dozens of works of art, the complete set
            of rules, playing advice, and information about the Karst
            Archipelago. Also included within its 96 pages are the adventure
            Shipwrecked on Gygalos Island and Things to Do in Porta Cortu, a
            mini-gazetteer that outlines one of the Karst Archipelago's most
            famous ports of call.
          </p>
          <p>
            This limited-edition, linen-wrapped hardback tome is printed by
            Hemlock, one of North America's most progressive and sustainable
            print providers. Purchase also includes the PDF edition, fulfilled
            via Itch.io and DriveThroughRPG.
          </p>
          <p>
            <em>
              <strong>Note: </strong>
              Shipping currently only available for US customers.
            </em>
          </p>
          <p>
            Karst is available from a number of fine retailers of bespoke role
            playing games and other sundries, both in the US and Canada.
          </p>
          <p>
            <strong>Retailers:</strong>
          </p>
          <ul>
            <li>
              <a href="https://lfosr.com">L.F. OSR</a>
            </li>
            <li>
              <a href="https://exaltedfuneral.com">Exalted Funeral</a>
            </li>
            <li>
              <a href="https://spearwitch.com">Spear Witch</a>
            </li>
            <li>
              <a href="https://nobleknight.com">Noble Knight Games</a>
            </li>
            <li>
              <a href="https://www.fourroguestrading.co">
                Four Rogues Trading Co
              </a>{' '}
              - Canadian Retailer
            </li>
            <li>
              <a href="https://rattiincantati.com">Ratti Incantati</a> -
              Canadian Retailer
            </li>
          </ul>
        </form>
        <h2 style={{ textAlign: 'center' }}>Digital</h2>
        <form action="/api/store/checkout_sessions" method="POST">
          <input type="hidden" name="itemKey" value="pdf" />
          <section>
            <button type="submit" role="link">
              Buy the PDF
            </button>
          </section>
          <br />
        </form>
        <p>
          Karst, the Complete Edition, in digital format. This PDF edition of
          Karst contains everything in the hardcover edition, but it's made out
          of zeros and ones instead of paper and ink. You can purchase the
          digital edition right here on the Karst site and a download link will
          be sent to your inbox.
        </p>
        <p>
          <em>
            <strong>Note: </strong>
            This website's PDF fulfillment technology is homemade; if you run
            into any issues, don't hesitate to reach out by replying to the
            email that includes the download link.
          </em>
        </p>
        <p>
          If you'd like a slightly less bespoke experience, or just prefer
          having all your digital RPGs in one place, Karst is also available in
          digital format from itch.io and DriveThruRPG. Purchase at any of these
          locations not only entitles you to a copy of Karst in PDF format, but
          also in ePUB, when it becomes available (Spring 2022).
        </p>
        <ul>
          <li>
            <a href="https://karstclub.itch.io/karst">Karst on itch.io</a>
          </li>
          <li>
            <a href="https://www.drivethrurpg.com/product/382035?affiliate_id=424588">
              Karst on DriveThruRPG
            </a>
          </li>
        </ul>
        {/*</div>*/}
      </div>
      <style jsx>
        {`
          .shop-container {
            /*display: flex;*/
          }
          @media (max-width: 1024px) {
            .shop-container {
              /*flex-direction: column;*/
            }
            .shop-listing {
              align-self: center;
            }
          }

          @media (min-width: 1025px) {
            .shop-container {
              /*flex-direction: row;*/
              justify-content: space-between;
            }
          }
          .shop-listing {
            width: 16em;
          }
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 16em;
            border-radius: 6px;
            justify-content: space-between;
            margin: 1em auto 0 auto;
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
          .sidebar-image > img {
            max-width: 100%;
          }
          @media (min-width: 768px) {
            .sidebar-image {
              margin-top: -1.5em;
            }
          }
        `}
      </style>
    </SidebarLayout>
  );
}
