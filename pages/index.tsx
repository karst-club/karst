import Layout from '../components/Layout';

export default function Index() {
  const content = (
    <div style={{ textAlign: 'center' }}>
      <br />
      <p>
        <em>
          In the center of the Mirror Sea, beneath the Impossibly Blue Sky, lies
          the Karst Archipelago.
        </em>
      </p>
      <p>
        It was once surrounded by the Three Distant Shores, but a generation has
        now passed
        <br />
        since the last ships arrived in the archipelago from those faraway
        lands.
      </p>
      <br />
      <p>
        <em>Life has gone on for the folk out here.</em>
      </p>
      <p>
        Small communities, island kingdoms, and nation states have formed
        <br />
        out of old refugee settlements, pirate camps, and trading outposts.
      </p>
      <br />
      <p>
        <em>Much remains unexplored.</em>
      </p>
      <p>
        Ancient ruins, lost treasure, and uncharted islands beckon.
        <br />
        Yet… there is a peculiar and sorrowful feeling here.
      </p>
      <br />
      <p>
        <em>
          Tragedy has befallen the Karst Archipelago,
          <br />
          grasping it in a slow, tender, and fatal embrace.
        </em>
      </p>
      <p>The end is near, but it is still a few chapters away.</p>
      <br />
      <p>
        <b>Welcome, fellow authors.</b>
      </p>
    </div>
  );
  return (
    <Layout>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '9rem', marginBottom: '0em' }}>Karst</h1>
        <img
          style={{ maxWidth: '20em' }}
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
  );
}
