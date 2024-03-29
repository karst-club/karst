import { Provider } from 'next-auth/client';

export default function App({ Component, pageProps }) {
  return (
    <>
      <meta
        property="og:title"
        content="Karst: A role playing game of discovery and soft horror"
      />
      <meta property="og:image" content="/images/karst.jpg" />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="530" />
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
      <script
        dangerouslySetInnerHTML={{
          __html: `
  !function(){var t,o,c,e=window,n=document,r=arguments,a="script",i=["call","cancelAction","config","identify","push","track","trackClick","trackForm","update","visit"],s=function(){var t,o=this,c=function(t){o[t]=function(){return o._e.push([t].concat(Array.prototype.slice.call(arguments,0))),o}};for(o._e=[],t=0;t<i.length;t++)c(i[t])};for(e.__woo=e.__woo||{},t=0;t<r.length;t++)e.__woo[r[t]]=e[r[t]]=e[r[t]]||new s;(o=n.createElement(a)).async=1,o.src="https://static.woopra.com/js/w.js",(c=n.getElementsByTagName(a)[0]).parentNode.insertBefore(o,c)}("woopra");

  woopra.config({
    domain: "karst.club",
    outgoing_tracking: true,
    download_tracking: true
  });

  woopra.track();
        `,
        }}
      />
    </>
  );
}
