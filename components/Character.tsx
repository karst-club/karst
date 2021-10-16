export type Props = {
  character: any;
  title?: boolean;
};

export default function Character({ character, title }: Props) {
  const c = character;
  const abilities = c.abilities.map((ability, i) => (
    <li key={`${c.name}-a-${i}`}>{ability.name}</li>
  ));
  const knacks = c.knacks.map((knack, i) => (
    <li key={`${c.name}-k-${i}`}>{knack.name}</li>
  ));
  const items = c.items.map((item, i) => (
    <li key={`${c.name}-i-${i}`}>{item.name}</li>
  ));
  return (
    <>
      {title ? <h1>{c.name}</h1> : <h3>{c.name}</h3>}
      <p>
        <em>
          {c.folk} {c.about}
        </em>
      </p>
      <section>
        <strong>Abilities:</strong>
        <ul>{abilities}</ul>
        <br />
      </section>
      <section>
        <strong>Knacks:</strong>
        <ul>{knacks}</ul>
        <br />
      </section>
      <section>
        <strong>Items:</strong>
        <ul>{items}</ul>
        <br />
        <strong>Coins:</strong> ¢{c.coins}
      </section>
      <style jsx>{`
        header {
          font-family: 'Hiawatha';
          font-size: 1.5rem;
        }
      `}</style>
    </>
  );
}
