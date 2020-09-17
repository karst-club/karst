import Knacks from './Knacks';
import Pages from './Pages';

/**
 * Data payload for rendering the Karst App
 */
export default interface KarstAPIResponse {
  /**
   * All of the game's available knacks
   */
  knacks?: Knacks;
  /**
   * All of the Page Data for the application content
   */
  pages?: Pages;
}
