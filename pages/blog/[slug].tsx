import SidebarLayout from '../../components/SidebarLayout';
import SidebarList from '../../components/SidebarList';

export default function Article({ article, articles }) {
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
      <h1>{article.title}</h1>
      <article>{article.content}</article>
    </SidebarLayout>
  );
}

export async function getServerSideProps({ params }) {
  const article = {
    title: params.slug,
    slug: params.slug,
    content: 'Nothing to see here.',
  };
  return {
    props: {
      article,
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
