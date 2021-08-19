import fs from 'fs';
import path from 'path';

export const BLOG_POSTS_PATH = path.join(process.cwd(), 'content/blog');
export const PAGES_PATH = path.join(process.cwd(), 'content/rulebook');
export const WORLDBOOKS_PATH = path.join(process.cwd(), 'content/worldbooks');

export const postsFilePaths = fs
  .readdirSync(BLOG_POSTS_PATH)
  .filter(path => /\.mdx?$/.test(path));

export const pageFilePaths = fs
  .readdirSync(PAGES_PATH)
  .filter(path => /\.mdx?$/.test(path));

export const worldbookFilePaths = fs
  .readdirSync(WORLDBOOKS_PATH)
  .filter(path => /\.mdx?$/.test(path));
