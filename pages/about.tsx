import SidebarLayout from '../components/SidebarLayout';

export default function About() {
  /*
        <br/><br/>
      <div
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <img
          style={{ maxWidth: '15em', margin: '0 auto' }}
          src="/images/karst-logo-small.png"
          alt="Karst Archipelago Historical Society Logo"
        	/>
      </div>
  */
  const image = (
    <div className="sidebar-image">
      <img src="/images/by-the-sea.jpg" alt="Lagartos netmakers by the sea." />
      <style jsx>{`
        .sidebar-image > img {
          max-width: 100%;
        }
        @media (min-width: 768px) {
          .sidebar-image {
            margin-top: -1.5em;
          }
        }
      `}</style>
    </div>
  );
  return (
    <SidebarLayout sidebar={image}>
      <h1>What is Karst?</h1>
      <p>
        <em>
          A downtempo post-apocalyptic role playing game with themes of
          adventure, exploration, and soft terror.
        </em>
      </p>
      <p>
        Karst is a way to create stories. This site contains the rules and
        setting of Karst, stories that have been created with it, and perhaps
        some notes about how and why this all came to be.
      </p>
      <p>
        Some day we may create more tools for creating stories and put them here
        as well.
      </p>
      <p>
        We highly encourage you to create, share, and even publish your own
        stories, rules, and source material for Karst.
      </p>
      <p>
        If you do end up wanting to publish things that use the Karst setting,
        we have a couple of guidelines that are linked to below.
      </p>
      <p>
        To learn about publication guidelines, or if you&apos;d like to see the
        source code, you can do so at our{' '}
        <a href="https://github.com/karst-club/karst">github</a>.
      </p>
      <p>
        If you&apos;d like to get in touch or follow along, you can find us on{' '}
        <a href="https://twitter.com/KarstClub">twitter</a>.
      </p>
      {/*<p>
        We also have a presence on{' '}
        <a href="https://karstclub.itch.io">itch.io</a>, where you can download
        pdfs and other play aids.
      </p>*/}
      <p>
        <i>Enjoy.</i>
      </p>
      <div
        dangerouslySetInnerHTML={{
          __html: `
        <!-- Begin Mailchimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/slim-10_7_dtp.css" rel="stylesheet" type="text/css">
<style type="text/css">
	#mc_embed_signup{ }
	/* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
<form action="https://club.us20.list-manage.com/subscribe/post?u=42a41a11b094ccd3a97207f0d&amp;id=deaedc24b7" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
	<label for="mce-EMAIL">Stay in the loop with the Karst Archipelago Historical Society Newsletter</label>
	<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_42a41a11b094ccd3a97207f0d_deaedc24b7" tabindex="-1" value=""></div>
        <div class="optionalParent">
            <div class="clear foot">
                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
                <p class="brandingLogo"><a href="http://eepurl.com/hQghzb" title="Mailchimp - email marketing made easy and fun"><img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg"></a></p>
            </div>
        </div>
    </div>
</form>
</div>

<!--End mc_embed_signup-->
        `,
        }}
      />
      <hr />
      <br />
      <p className="copyright">
        © 2020, 2021 The Karst Archipelago Historical Society.
      </p>
      <img
        className="logo-image"
        src="/images/karst-logo-small.png"
        alt="Karst Archipelago Historical Society Logo"
      />
      <style jsx>{`
        .copyright {
          text-align: center;
        }
        .logo-image {
          max-width: 10em;
          display: block;
          margin: 0 auto;
        }
        .sidebar-image > img {
          max-width: 100%;
        }
        @media (min-width: 768px) {
          .sidebar-image {
            margin-top: -1.5em;
          }
        }
      `}</style>
    </SidebarLayout>
  );
}
