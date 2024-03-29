import Head from 'next/head';
import Layout from '../components/Layout';

export default function Index() {
  const content = (
    <div style={{ textAlign: 'center' }}>
      <br />
      <p style={{ textAlign: 'center' }}>
        <em>
          In the center of the Mirror Sea, beneath the Impossibly Blue Sky, lies
          the Karst Archipelago.
        </em>
      </p>
      <p style={{ textAlign: 'center' }}>
        It was once surrounded by the Three Distant Shores, but a generation has
        now passed
        <br />
        since the last ships arrived in the archipelago from those faraway
        lands.
      </p>
      <br />
      <p style={{ textAlign: 'center' }}>
        <em>Life has gone on for the folk out here.</em>
      </p>
      <p style={{ textAlign: 'center' }}>
        Small communities, island kingdoms, and nation states have formed
        <br />
        out of old refugee settlements, pirate camps, and trading outposts.
      </p>
      <br />
      <p style={{ textAlign: 'center' }}>
        <em>Much remains unexplored.</em>
      </p>
      <p style={{ textAlign: 'center' }}>
        Ancient ruins, lost treasure, and uncharted islands beckon.
        <br />
        Yet… there is a peculiar and sorrowful feeling here.
      </p>
      <br />
      <p style={{ textAlign: 'center' }}>
        <em>
          Tragedy has befallen the Karst Archipelago,
          <br />
          grasping it in a slow, tender, and fatal embrace.
        </em>
      </p>
      <p style={{ textAlign: 'center' }}>
        The end is near, but it is still a few chapters away.
      </p>
      <br />
      <p style={{ textAlign: 'center' }}>
        <b>Welcome, fellow authors.</b>
      </p>
    </div>
  );
  return (
    <>
      <Head>
        <meta
          property="og:title"
          content="Karst: A role playing game of discovery and soft horror"
        />
        <meta
          property="og:image"
          content="https://karst.club/images/karst.jpg"
        />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="530" />
      </Head>
      <Layout>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '7.5rem', marginBottom: '0em' }}>Karst</h1>
          <img
            style={{ maxWidth: '18em' }}
            src="/images/lagartos-spiritist.png"
            alt="Lagartos spiritist plays a strange song."
          />
          {content}
          <div>
            <img
              style={{ maxWidth: '10em' }}
              src="/images/karst-logo-small.png"
              alt="Karst Archipelago Historical Society Logo"
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
