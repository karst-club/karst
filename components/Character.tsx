import characterBlurb from '../lib/characterBlurb';

export type Props = {
  character: any;
  title?: boolean;
};

export default function Character({ character, title }: Props) {
  return <p>{characterBlurb(character)}</p>;
  /*
  const c = character;
  const abilities = c.abilities.map((ability, i) => (
    <li key={`${c.name}-a-${i}`}>{ability.name}</li>
  ));
  const knacks = Object.keys(c.knacks).map((k, i) => (
    <li key={`${c.name}-k-${i}`}>{knacks[k].name}</li>
  ));
  const items = c.items.map((item, i) => (
    <li key={`${c.name}-i-${i}`}>{item.name}</li>
  ));
  return (
    <>
      {title ? <h1>{c.name}</h1> : <h3>{c.name}</h3>}
      <p>
        <em>
          {c.folk} {c.background}
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
  */
}
