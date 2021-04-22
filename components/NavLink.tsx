import Link from 'next/link';

export default function NavLink({ title, href }) {
  return (
    <>
      <Link key={href} href={href}>
        <a>{title}</a>
      </Link>
      <style jsx>{`
        a {
          color: inherit;
          text-decoration: inherit;
          font-family: 'Hiawatha';
          font-size: 1.5rem;
        }
      `}</style>
    </>
  );
}
