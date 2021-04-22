import fs from 'fs';
import path from 'path';

// POSTS_PATH is useful when you want to get the path to a specific file
export const PAGES_PATH = path.join(process.cwd(), 'rulebook');
export const WORLDBOOKS_PATH = path.join(process.cwd(), 'worldbooks');

export const pageFilePaths = fs
  .readdirSync(PAGES_PATH)
  .filter(path => /\.mdx?$/.test(path));

export const worldbookFilePaths = fs
  .readdirSync(WORLDBOOKS_PATH)
  .filter(path => /\.mdx?$/.test(path));
