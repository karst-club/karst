// This is some **bullshit** because next/image went and had _opinions_.
// Currently just using an <img> with styles={{ maxWidth: '100%' }}, instead
// Let this mark the point where i first found a complaint about next.js
import Image from 'next/image';

export default function CustomImage(props) {
  return (
    <>
      <div className="image-container">
        <Image src={props.src} className="image" layout="fill" />
      </div>
      <style jsx>{`
        .image-container {
          width: 100%;
        }
        .image-container div {
          position: unset !important;
        }

        .image {
          object-fit: contain;
          width: 100% !important;
          position: relative !important;
          height: unset !important;
        }
      `}</style>
    </>
  );
}
