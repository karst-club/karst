import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { worldbookFilePaths, WORLDBOOKS_PATH } from '../../lib/mdxUtils';
import SidebarLayout from '../../components/SidebarLayout';
import SidebarList from '../../components/SidebarList';
import TwoColumns from '../../components/TwoColumns';

export default function Index({ books, upcomingTitles }) {
  const sidebar = (
    <>
      <h2>Generators</h2>
      <ul>
        <li>
          <Link href="/worldbooks/inspiration">Characters & Stories</Link>
        </li>
      </ul>
      <SidebarList title="Worldbooks" pages={books} />
    </>
  );
  return (
    <SidebarLayout sidebar={sidebar}>
      <TwoColumns
        columnOne={
          <>
            <h1>Worldbooks & Tales</h1>
            <p>
              These texts—first person accounts from the Archipelago—have been
              recovered and translated by the Karst Archipelago Historical
              Society for your edification. Their accuracy remains a matter of
              debate, but they are presented here without commentary for your
              discernment and deliberation.
            </p>
            <p>
              The Historical Society continues to research these matters and
              will publish revisions and newly discovered texts as they are
              recovered. Contributions from other research organizations are
              always welcome—after a cursory review by the Historical Society,
              of course.
            </p>
          </>
        }
        columnTwo={
          <img
            style={{ maxWidth: '100%' }}
            src="/images/serpos-scholar.png"
            alt="Veldling letter carrier"
          />
        }
      />
      <h2>Recovered Texts:</h2>
      <ul>
        {books.map(book => (
          <li>
            <Link href={book.href}>{book.title}</Link>
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

  return {
    props: {
      books,
      upcomingTitles,
    },
  };
}
