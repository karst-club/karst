export default function Fonts() {
  return (
    <style jsx global>{`
      @font-face {
        font-family: 'Hiawatha';
        font-style: normal;
        font-weight: normal;
        src: url('/WFHiawatha.woff2') format('woff2');
        text-rendering: optimizeLegibility;
      }

      @font-face {
        font-family: 'Ibarra Real Nova';
        src: url('/IbarraRealNova-Regular-400.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
      }

      @font-face {
        font-family: 'Ibarra Real Nova';
        src: url('/IbarraRealNova-Italic-400.woff2') format('woff2');
        font-weight: normal;
        font-style: italic;
      }

      @font-face {
        font-family: 'Ibarra Real Nova';
        src: url('/IbarraRealNova-Bold-700.woff2') format('woff2');
        font-weight: bold;
        font-style: normal;
      }

      @font-face {
        font-family: 'Ibarra Real Nova';
        src: url('/IbarraRealNova-BoldItalic-700.woff2') format('woff2');
        font-weight: bold;
        font-style: italic;
      }
    `}</style>
  );
}
