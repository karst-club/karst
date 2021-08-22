import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { postsFilePaths, BLOG_POSTS_PATH } from '../../lib/mdxUtils';
import ArticleBlurb from '../../components/ArticleBlurb';
import SidebarLayout from '../../components/SidebarLayout';
import SidebarList from '../../components/SidebarList';
import TwoColumns from '../../components/TwoColumns';

export default function Index({ articles }) {
  return (
    <SidebarLayout
      sidebar={
        <SidebarList
          title="Articles"
          pages={articles.map(article => ({
            title: article.data.title,
            href: `/blog/${article.data.slug}`,
          }))}
        />
      }
    >
      <TwoColumns
        columnOne={
          <>
            <h1>Blog</h1>
            {articles.map(article => (
              <ArticleBlurb
                key={article.slug}
                {...article.data}
                href={`/blog/${article.data.slug}`}
              />
            ))}
          </>
        }
        columnTwo={
          <img
            style={{ maxWidth: '100%' }}
            src="/images/veldling-messenger.png"
            alt="Veldling letter carrier"
          />
        }
      />
    </SidebarLayout>
  );
}

export async function getStaticProps({ params }) {
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
    props: { articles },
  };
}
