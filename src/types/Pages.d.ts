import Page from './Page';

export default interface Pages {
  /**
   * Each key in the pageData represents a page's unique ID and corresponds to the yaml/markdown filenames in static/page_data
   */
  [k: string]: Page;
}
