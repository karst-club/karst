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
import SidebarList from '../../components/SidebarList';
import { postsFilePaths, BLOG_POSTS_PATH } from '../../lib/mdxUtils';

const components = {
  a: CustomLink,
  Head,
};

export default function Article({ source, data, articles }) {
  const formattedPages = articles.map(article => ({
    title: article.data.title,
    href: `/blog/${article.filePath.replace(/\.mdx?$/, '')}`,
  }));

  const content = hydrate(source, { components });

  return (
    <SidebarLayout
      sidebar={<SidebarList title="Articles" pages={formattedPages} />}
    >
      <h1>{data.title}</h1>
      <article>{content}</article>
      <p>
        <em>{data.published}</em>
      </p>
    </SidebarLayout>
  );
}

export async function getStaticProps({ params }) {
  const postFilePath = path.join(BLOG_POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);
  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, {
    components,
    scope: data,
  });

  const articles = postsFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(BLOG_POSTS_PATH, filePath));
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
      data: data,
      articles,
    },
  };
}

export const getStaticPaths = async () => {
  const paths = postsFilePaths
    .map(path => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
