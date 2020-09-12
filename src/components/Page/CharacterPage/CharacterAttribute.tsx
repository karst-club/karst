import React from 'react';

export interface Props {
  name: string;
  value?: number;
}

const CharacterAttribute = ({ name, value }: Props) => {
  if (!value) return <li />;
  const displayName = name[0].toUpperCase() + name.slice(1);

  const modifier =
    value < 4
      ? -3
      : value < 6
      ? -2
      : value < 9
      ? -1
      : value < 13
      ? 0
      : value < 16
      ? 1
      : value < 18
      ? 2
      : 3;

  return (
    <li>
      {displayName}: {value} <strong>({modifier})</strong>
    </li>
  );
};

export default CharacterAttribute;
