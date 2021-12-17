import CustomLink from './CustomLink';

export default function CharacterBlurb({ character }) {
  return (
    <article key={character.id}>
      <CustomLink href={`/stories/characters/${character.id}`}>
        <h3>{character.name}</h3>
      </CustomLink>
      <p>
        <em>
          {character.folk} {character.background}
        </em>
      </p>
    </article>
  );
}
