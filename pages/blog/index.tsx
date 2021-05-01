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
          title: 'Nothing',
          slug: 'shh',
          content: 'Nothing to see here.',
          blurb: '...',
        },
        { title: 'Blank', slug: 'nil', content: 'Nothing to see here.' },
      ],
    },
  };
}
