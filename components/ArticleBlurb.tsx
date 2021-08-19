import CustomLink from './CustomLink';

export default function ArticleBlurb(article) {
  return (
    <article>
      <CustomLink href={article.href}>
        <h2>{article.title}</h2>
      </CustomLink>
      <p>{article.blurb || article.content.slice(0, 50)}</p>
      <p>
        <em>{article.published}</em>
      </p>
    </article>
  );
}
