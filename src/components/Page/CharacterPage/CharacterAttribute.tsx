import React from 'react';

export interface Props {
  name: string;
  value?: number;
}

interface ModifierTier {
  modifier: number;
  ceiling: number;
}

const tiers: ModifierTier[] = [
  { modifier: -3, ceiling: 3 },
  { modifier: -2, ceiling: 5 },
  { modifier: -1, ceiling: 8 },
  { modifier: 0, ceiling: 12 },
  { modifier: 1, ceiling: 15 },
  { modifier: 2, ceiling: 17 },
  { modifier: 3, ceiling: 999 },
];

const CharacterAttribute = ({ name, value: attributeValue }: Props) => {
  if (!attributeValue) return <li />;
  const displayName = name[0].toUpperCase() + name.slice(1);
  const tier = tiers.find(t => attributeValue <= t.ceiling);
  const modifier = tier && tier.modifier;

  return (
    <li>
      {displayName}: {attributeValue} <strong>({modifier})</strong>
    </li>
  );
};

export default CharacterAttribute;
