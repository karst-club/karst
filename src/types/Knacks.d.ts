import Knack from './Knack';

export default interface Knacks {
  /**
   * The keys of the knacks dict are the Knack Names
   */
  [k: string]: Knack;
}
