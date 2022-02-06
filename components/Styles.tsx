export default function Styles() {
  return (
    <style jsx global>{`
      * {
        margin: 0;
        padding: 0;
      }

      :root {
        --site-color: #851a12;
        --divider-color: rgba(0, 0, 0, 0.4);
      }

      html {
        font: 100%/1.5 system-ui;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: 'Ibarra Real Nova', serif;
        font-size: 18px;
        /*background: #fefdf8;*/
        /* background: #fefdfa; */
        background: #fff;
        color: #150802;
        scrollbar-gutter: stable both-edges;
      }

      /*
      @media (prefers-color-scheme: dark) {
        html {
          background: #150802;
          color: #fff;
        }
      }
      */

      body {
        max-width: 1080px;
        margin: 0 auto;
      }

      h1,
      h2,
      h3,
      h4,
      h5 {
        font-family: 'Hiawatha';
        font-weight: 400;
      }

      h1 {
        /*color: #851a12;*/
        font-size: 2em;
        margin-bottom: 1em;
      }

      h2 {
        font-size: 1.75em;
        margin-bottom: 0.5em;
      }

      h3 {
        font-size: 1.5em;
        margin-bottom: 0.75em;
      }

      h4 {
        font-size: 1.25em;
        margin-bottom: 0.5em;
      }

      h5 {
        font-size: 1em;
        margin-bottom: 0.5em;
      }

      p {
        margin-bottom: 1.5em;
        text-align: justify;
      }

      a {
        color: inherit;
        text-decoration-color: var(--divider-color);
        text-decoration-thickness: 2px;
      }

      a:hover {
        color: var(--site-color);
        text-decoration-color: currentcolor;
      }

      ul {
        margin-bottom: 1em;
      }

      li {
        list-style-position: inside;
        list-style-type: none;
        text-align: justify;
      }

      li:before {
        content: '»';
        padding-right: 0.5em;
      }

      code {
        font-family: 'Menlo';
      }
    `}</style>
  );
}
