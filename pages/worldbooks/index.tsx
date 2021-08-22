import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { worldbookFilePaths, WORLDBOOKS_PATH } from '../../lib/mdxUtils';
import SidebarLayout from '../../components/SidebarLayout';
import SidebarList from '../../components/SidebarList';

export default function Index({ books, upcomingTitles }) {
  const sidebar = <SidebarList title="Worldbooks" pages={books} />;
  return (
    <SidebarLayout sidebar={sidebar}>
      <h1>Worldbooks & Tales</h1>
      <p>
        These texts—first person accounts from the Archipelago—have been
        recovered and translated by the Karst Archipelago Historical Society for
        your edification. Their accuracy remains a matter of debate, but they
        are presented here without commentary for your discernment and
        deliberation.
      </p>
      <p>
        The Historical Society continues to research these matters and will
        publish revisions and newly discovered texts as they are recovered.
        Contributions from other research organizations are always welcome—after
        a cursory review by the Historical Society, of course.
      </p>
      <h2>Recovered Texts:</h2>
      <ul>
        {books.map(book => (
          <li>
            <a href={book.href}>{book.title}</a>
          </li>
        ))}
      </ul>
      <h2>Current & Future Research:</h2>
      <ul>
        {upcomingTitles.map(title => (
          <li>{title}</li>
        ))}
      </ul>
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
    href: `/worldbooks/${book.data.slug}`,
    ...book.data,
  }));

  const upcomingTitles = ['The Merchant’s Daughter', 'The Tale of Widmer'];

  return { props: { books, upcomingTitles } };
}
