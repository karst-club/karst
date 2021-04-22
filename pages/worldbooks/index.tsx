import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { worldbookFilePaths, WORLDBOOKS_PATH } from '../../lib/mdxUtils';
import SidebarLayout from '../../components/SidebarLayout';
import SidebarList from '../../components/SidebarList';

export default function Index({ books }) {
  const sidebar = <SidebarList title="Worldbooks" pages={books} />;
  return (
    <SidebarLayout sidebar={sidebar}>
      <h1>Worldbooks</h1>
    </SidebarLayout>
  );
}

export function getStaticProps() {
  const booksFull = worldbookFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(WORLDBOOKS_PATH, filePath));
    const { content, data } = matter(source);

    return { content, data, filePath };
  });

  const books = booksFull.map(book => ({
    title: book.data.title,
    href: `/worldbooks/${book.data.slug}`,
  }));

  return { props: { books } };
}
