export default function MDXPage({ data, content }) {
  return (
    <>
      <div className="post-header">
        <h1>{data.title}</h1>
        {data.description && <p className="description">{data.description}</p>}
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
    </>
  );
}
