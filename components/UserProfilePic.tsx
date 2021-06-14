export default function UserProfilePic({ session }) {
  return (
    <>
      <img src={session.user.image} />
      <style jsx>{`
        img {
          height: 48px;
          width: 48px;
          border-top-left-radius: 50% 50%;
          border-top-right-radius: 50% 50%;
          border-bottom-right-radius: 50% 50%;
          border-bottom-left-radius: 50% 50%;
        }
      `}</style>
    </>
  );
}
