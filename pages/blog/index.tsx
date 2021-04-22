import ArticleBlurb from '../../components/ArticleBlurb';
import SidebarLayout from '../../components/SidebarLayout';
import SidebarList from '../../components/SidebarList';

export default function Index({ articles }) {
  return (
    <SidebarLayout
      sidebar={
        <SidebarList
          title="Articles"
          pages={articles.map(article => ({
            title: article.title,
            href: `/blog/${article.slug}`,
          }))}
        />
      }
    >
      <h1>Blog</h1>
      {articles.map(article => (
        <ArticleBlurb
          key={article.slug}
          href={`/blog/${article.slug}`}
          {...article}
        />
      ))}
    </SidebarLayout>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      articles: [
        {
          title: 'test',
          slug: 'foo',
          content: 'I am content',
          blurb: 'I am blrub',
        },
        { title: 'testoo', slug: 'bar', content: 'da' },
      ],
    },
  };
}
