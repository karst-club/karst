export default interface Sheet {
  /**
   * Character's name
   */
  name?: string;
  /**
   * Player's name
   */
  player?: string;
  species?:
    | 'Serpos'
    | 'Visita'
    | 'Grevling'
    | 'Veldling'
    | 'Eekhorn'
    | 'Lagartos';
  hook?: string;
  level?: number;
  xp?: number;
  attributes?: {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
  };
  max_hp?: number;
  hp?: number;
  coins?: number;
  knacks?: string[];
  items?: string[];
}
