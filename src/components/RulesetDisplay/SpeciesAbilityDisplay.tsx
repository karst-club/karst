import React from 'react';
import speciesAbilities from '../../utils/rules/speciesAbilities';
import Species from '../../types/Species';

const SpeciesAbilityDisplay: React.FunctionComponent<Species> = ({
  species,
}: Species) => (
  <ul>
    {speciesAbilities[species].map(ability => (
      <li key={ability}>{ability}</li>
    ))}
  </ul>
);

export default SpeciesAbilityDisplay;
