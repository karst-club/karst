import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Knack from '../../types/Knack';
import Knacks from '../../types/Knacks';

export interface Props {
  knackName: string;
}

const KnackDisplay: React.FC<props> = ({ knackName }: Props) => {
  const data = useStaticQuery(
    graphql`
      query {
        allKnack {
          nodes {
            level
            effect
            category
            name
          }
        }
      }
    `
  );
  const knack: Knack = data.allKnack.nodes
    .filter((knack: Knack) => knackName.startsWith(knack.name))
    .pop();
  const toolTip = knack?.effect || '';
  return (
    <li
      key={knackName
        .toLowerCase()
        .replace(/\s/g, '-')
        .replace(/[^\w-]/g, '')}
      data-tip={toolTip}
    >
      {knackName}
    </li>
  );
};

export default KnackDisplay;
