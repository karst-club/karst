import { useRouter } from 'next/router';
import NavLink from './NavLink';

export const MAIN_NAV = [
  { href: '/', title: 'Karst' },
  { href: '/rulebook/01-beginnings', title: 'Rulebook' },
  { href: '/worldbooks', title: 'Worldbooks' },
  { href: '/stories', title: 'Stories' },
  { href: '/blog', title: 'Blog' },
  { href: '/about', title: 'About' },
];

export default function Nav() {
  const router = useRouter();
  const links = MAIN_NAV.map(({ href, title }) => (
    <div key={href}>
      <div
        className={
          router.asPath.indexOf(href.split('/')[1]) === 1 ? 'active' : ''
        }
      >
        <NavLink href={href} title={title} />
      </div>
      <style jsx>{`
        .active {
          color: #851a12;
        }
      `}</style>
    </div>
  ));
  return (
    <>
      <nav>{links}</nav>
      <style jsx>{`
        nav {
          display: flex;
          padding: 1em 0;
          top: 0;
          justify-content: space-between;
          background: #fefdf8;
          width: 100%;
        }

        @media (max-width: 767px) {
          nav {
            margin-left: -1rem;
            flex-direction: column;
            text-align: center;
          }
        }
        @media (min-width: 768px) {
          nav {
            position: sticky;
            flex-direction: row;
          }
        }
      `}</style>
    </>
  );
}