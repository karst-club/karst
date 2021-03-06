import fs from 'fs';
import matter from 'gray-matter';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import CustomLink from '../../components/CustomLink';
import SidebarLayout from '../../components/SidebarLayout';
import { pageFilePaths, PAGES_PATH } from '../../lib/mdxUtils';
import SidebarList from '../../components/SidebarList';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  TestComponent: dynamic(() => import('../../components/TestComponent')),
  Head,
};

export default function RulebookPage({ source, frontMatter, pages }) {
  const formattedPages = pages.map(page => ({
    title: page.data.title,
    href: `/rulebook/${page.filePath.replace(/\.mdx?$/, '')}`,
  }));

  const content = hydrate(source, { components });

  return (
    <SidebarLayout
      sidebar={<SidebarList title="Chapters" pages={formattedPages} />}
    >
      <div className="post-header">
        <h1>{frontMatter.title}</h1>
        {frontMatter.description && (
          <p className="description">{frontMatter.description}</p>
        )}
      </div>
      <main>{content}</main>

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

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(PAGES_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  const pages = pageFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(PAGES_PATH, filePath));
    const { content, data } = matter(source);
    return {
      content,
      data,
      filePath,
    };
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      pages,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = pageFilePaths
    // Remove file extensions for page paths
    .map(path => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
