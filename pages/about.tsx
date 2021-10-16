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
    <div>
      <img
        style={{ maxWidth: '100%' }}
        src="/images/veldling-messenger.png"
        alt="Veldling letter carrier"
      />
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

      <hr />
      <br />
      <p style={{ textAlign: 'center' }}>
        © 2020, 2021 The Karst Archipelago Historical Society.
      </p>
      <img
        style={{ maxWidth: '10em', display: 'block', margin: '0 auto' }}
        src="/images/karst-logo-small.png"
        alt="Karst Archipelago Historical Society Logo"
      />
    </SidebarLayout>
  );
}
