import { signOut, useSession } from 'next-auth/client';
import CustomLink from './CustomLink';
import UserProfilePic from './UserProfilePic';

export default function UserStatus() {
  const [session] = useSession();

  return (
    <div>
      {!session && (
        <>
          <CustomLink href="/api/auth/signin">Log in</CustomLink>
        </>
      )}
      {session && (
        <>
          <div className="float-child">
            <UserProfilePic session={session} />
          </div>
          <div className="float-child">
            <div>Ahoy, {session.user.name}!</div>
            <button onClick={() => signOut()}>Log out</button>
          </div>
          <style jsx>{`
            div.float-child {
              float: left;
            }
          `}</style>
        </>
      )}
    </div>
  );
}
