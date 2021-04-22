import Styles from './Styles';
import Fonts from './Fonts';
import Nav from './Nav';

export default function Layout({ children }) {
  return (
    <>
      <div className="page-wrapper">
        <Nav />
        <div className="content-wrapper">{children}</div>
      </div>
      <Fonts />
      <Styles />
      <style jsx>{`
        .page-wrapper {
          padding-left: calc(24px + env(safe-area-inset-left));
          padding-right: calc(24px + env(safe-area-inset-right));
          margin-bottom: 8px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .content-wrapper {
          width: 100%;
        }

        @media (min-width: 768px) {
          .page-wrapper {
            padding-left: calc(48px + env(safe-area-inset-left));
            padding-right: calc(48px + env(safe-area-inset-right));
          }
        }
      `}</style>
    </>
  );
}
