import fs from 'fs';
import matter from 'gray-matter';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import generateCharacter from '../../lib/characterGenerator';
import generateStory from '../../lib/storyGenerator';
import CustomLink from '../../components/CustomLink';
import Character from '../../components/Character';
import SidebarLayout from '../../components/SidebarLayout';
import TwoColumns from '../../components/TwoColumns';
import { worldbookFilePaths, WORLDBOOKS_PATH } from '../../lib/mdxUtils';
import SidebarList from '../../components/SidebarList';

const components = {
  a: CustomLink,
  Head,
};

export default function WorldbookPage({ character, story, pages }) {
  return (
    <SidebarLayout
      sidebar={
        <>
          <br />
          <h2>Inspiration</h2>
          <ul>
            <li>
              <Link href="/worldbooks/inspiration">Characters & Stories</Link>
            </li>
          </ul>
          <SidebarList title="Worldbooks" pages={pages} />
        </>
      }
    >
      <div className="post-header">
        <h1>Inspiration: Characters & Stories</h1>
      </div>
      <main>
        <h2>A Character</h2>
        <Character character={character} />
        <h2>A Story</h2>
        <p>{story}</p>
      </main>

      <style jsx>{`
        .post-header h1 {
          margin-bottom: 0;
        }

        .post-header {
          margin-bottom: 2rem;
        }
        .description {
          opacity: 0.6;
        }
      `}</style>
    </SidebarLayout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const pages = worldbookFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(WORLDBOOKS_PATH, filePath));
    const { data } = matter(source);
    return {
      href: `/worldbooks/${filePath.replace(/\.mdx?$/, '')}`,
      ...data,
    };
  });

  return {
    props: {
      character: generateCharacter(),
      story: generateStory(),
      pages,
    },
  };
};
