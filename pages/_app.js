import '@/styles/globals.css'

import Head from 'next/head';
import Script from 'next/script'
import AnswerContextProvider from '../components/landingPage/contextStrore/answerContextProvider';
import VoiceContextProvider from '../components/landingPage/contextStrore/voiceContextProvider';
import AuthContextProvider from '@/components/landingPage/contextStrore/authContextProvider';
import HomeContextProvider from '@/components/landingPage/contextStrore/homeContextProvider';

// var delighted = require('delighted')('N0eSl5rCYkJF5SIaalxxsRDfTV7JBUPN');
const App = ({ Component, pageProps, router }) => {
 
  // delighted.person.create({
  //   email: 'support@peakhealth.tech',
  //   properties: { "Purchase Experience": "Mobile App", "State": "CA" },
  // });


  return (
    <>
       <Head>
          <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"/>
        </Head>

{/* <Script type="text/javascript">
  {`
  !function(e,t,r,n){if(!e[n]){for(var a=e[n]=[],i=["survey","reset","config","init","set","get","event","identify","track","page","screen","group","alias"],s=0;s<i.length;s++){var c=i[s];a[c]=a[c]||function(e){return function(){var t=Array.prototype.slice.call(arguments);a.push([e,t])}}(c)}a.SNIPPET_VERSION="1.0.1";var o=t.createElement("script");o.type="text/javascript",o.async=!0,o.src="https://d2yyd1h5u9mauk.cloudfront.net/integrations/web/v1/library/"+r+"/"+n+".js";var p=t.getElementsByTagName("script")[0];p.parentNode.insertBefore(o,p)}}(window,document,"YjyHQ8uZ4Xg6knXi","delightedNps");

  delightedNps.survey();`
}
</Script> */}


      <Script type="text/javascript">
        {` 
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "gu2a7l52va");
      `}
      </Script>


      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-64VSBXJZV4"
        strategy="afterInteractive"
      />
      <Script id="G-64VSBXJZV4" strategy="afterInteractive" >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-64VSBXJZV4');
        `}
      </Script>
      {/* {/* <!-- Google Tag Manager --!> */}
      <Script>
        {`(function(w,d,s,l,i){
              w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })
              (window,document,'script','dataLayer','GTM-KVK8C36');`
        }
      </Script>
      {/* <!-- End Google Tag Manager --> */}

      {/* <GoogleAnalytics gaMeasurementId='G-64VSBXJZV4' /> */}
      <HomeContextProvider>
      <AuthContextProvider>
        <VoiceContextProvider>
          <AnswerContextProvider>
            <Component {...pageProps} />
          </AnswerContextProvider>
        </VoiceContextProvider>
      </AuthContextProvider>
      </HomeContextProvider>
    </>
  )
}

export default App
