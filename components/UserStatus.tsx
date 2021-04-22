import { signOut, useSession } from 'next-auth/client';
import CustomLink from './CustomLink';

export default function UserStatus() {
  const [session] = useSession();

  return (
    <>
      {!session && (
        <>
          <CustomLink href="/api/auth/signin">Log in</CustomLink>
        </>
      )}
      {session && (
        <>
          <p>Ahoy, {session.user.name}!</p>
          <button onClick={() => signOut()}>Log out</button>
        </>
      )}
    </>
  );
}
