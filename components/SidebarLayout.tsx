import Layout from './Layout';

export default function SidebarLayout({ children, sidebar }) {
  return (
    <>
      <Layout>
        <div className="column-wrapper">
          <div className="sidebar">
            <div className="sidebar-inside">{sidebar}</div>
          </div>
          <div className="content">{children}</div>
        </div>
      </Layout>
      <style jsx>{`
        .column-wrapper {
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 767px) {
          .content {
            order: -1;
          }
        }

        @media (min-width: 768px) {
          .column-wrapper {
            flex-direction: row;
          }

          .sidebar {
            width: 33%;
            margin-top: 2em;
          }

          .sidebar-inside {
            padding-right: 1em;
          }

          .content {
            width: 66%;
          }
        }
      `}</style>
    </>
  );
}
