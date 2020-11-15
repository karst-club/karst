import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { parseKnackRawMD } from '../../utils/rulesEngine';
import Knack from '../../types/Knack';
import Knacks from '../../types/Knacks';

export interface Props {
  knackName: string;
}

const KnackDisplay: React.FC<props> = ({ knackName }: Props) => {
  const data = useStaticQuery(
    graphql`
      query {
        file(base: { eq: "knacks.mdx" }) {
          internal {
            content
          }
        }
      }
    `
  );
  const allKnacks: Knacks = parseKnackRawMD(data.file.internal.content);
  const knack: Knack | undefined = allKnacks[knackName];
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
