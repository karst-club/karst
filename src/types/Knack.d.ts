export default interface Knack {
  /**
   * Each knack belongs to a category i.e. The Fundamentals, Hero Stuff
   */
  category: string;
  /**
   * Full description of the knack in markdown with all details
   */
  content: string;
  /**
   * A sub-portion of the content which describes the knack's effect
   */
  effect: string;
  /**
   * A sub-portion of the content which describes the knack's level
   */
  level: string;
  /**
   * A sub-portion of the content containing special notes about this knack
   */
  note?: string;
}
