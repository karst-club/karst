import React from 'react';
import Knack from '../../../types/Knack';
import Knacks from '../../../types/Knacks';

export interface Props {
  knackName: string;
  knacks?: Knacks;
}

const KnackDisplay = ({ knackName, knacks }: Props) => {
  if (!knacks) return null;
  const knack: Knack | undefined = knacks[knackName];
  const toolTip = knack?.effect || '';

  return (
    <li key={knackName} data-tip={toolTip}>
      {knackName}
    </li>
  );
};

export default KnackDisplay;
