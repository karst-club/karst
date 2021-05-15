import Link from 'next/link';

/* eslint-disable jsx-a11y/anchor-has-content */
export default function CustomLink({ href, ...otherProps }) {
  return (
    <>
      <Link href={href}>
        <a {...otherProps} />
      </Link>
      <style jsx>{`
        a {
          color: #150802;
        }
        a:hover,
        a:active {
          color: #851a12;
        }
      `}</style>
    </>
  );
}
