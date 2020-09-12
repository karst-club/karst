import Sheet from './Sheet';
import Subpage from './Subpage';

export default interface Page {
  /**
   * The page's id a.k.a. the name of the corresponding yaml/markdown files.
   */
  key: string;
  /**
   * This is the page's Display Name
   */
  title: string;
  /**
   * Markdown content which will rendered in a page with MDX
   */
  content: string;
  /**
   * The page's icon which must be an emoji. 😈
   */
  icon: string;
  /**
   * Used on the backend to sort subpages that would appear on the same level into a preferred order. Not currently referenced anywhere in the frontend
   */
  ordinal_position?: number;
  /**
   * All pages except the root page should have this defined. It's used on the backend to construct the subpages list, and it's used in the frontend to construct navigation trees
   */
  parent_page?: string;
  /**
   * Derived from parent_pages by the API and placed into order based on ordinal_position, this is then used on the frontend to create the subpage navigation element.
   */
  subpages: Subpage[];
  /**
   * The intent of this field is to enable to selection of differentiated page layouts on the frontend. Currently there is only one layout other than the default, and that is for the character sheet.
   */
  layout?: 'character';
  /**
   * When the character layout is present, then the sheet will also be required.
   */
  sheet?: Sheet;
  /**
   * Should reference to a file in static/media (this is enforced by unit test). The default layout will use this image to replace the default header image. The character sheet layout will instead embed this image onto the page as a separate element.
   */
  image?: string;
  /**
   * Recorded on episodes for posterity, not exposed or used anywhere at the moment. Also currently inconsistent between the yaml, python, and API response values - yaml has YYYY-MM-DD, python has it as a datetime.date, and API response has it as a pretty verbose date string (Mon, 24 Aug 2020 00:00:00 GMT)
   */
  session_date?: {
    [k: string]: unknown;
  };
}
