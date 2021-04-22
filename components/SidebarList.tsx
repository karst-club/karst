import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SidebarList({ title, pages }) {
  const path = useRouter().asPath;
  return (
    <>
      <br />
      <h2>{title}</h2>
      <ul>
        {pages.map(page => (
          <li key={page.href} className={page.href === path ? 'active' : ''}>
            <Link href={page.href}>
              <a>{page.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .active {
          color: #851a12;
        }
      `}</style>
    </>
  );
}
