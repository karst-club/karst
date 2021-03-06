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
        background: #fefdf8;
        color: #150802;
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
        color: #851a12;
        font-size: 4.5em;
      }

      h2 {
        font-size: 2em;
        margin-bottom: 0.5em;
      }

      h3 {
        font-size: 1.5em;
        margin-bottom: 0.5em;
      }

      h4 {
        font-size: 1.5em;
        margin-bottom: 0.5em;
      }

      h5 {
        font-size: 18px;
        margin-bottom: 0.5em;
      }

      p {
        margin-bottom: 1.5rem;
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
      }

      li {
        list-style-position: inside;
        list-style-type: none;
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
