import '@/styles/globals.css'

import Head from 'next/head';
import Script from 'next/script'
import AnswerContextProvider from '../components/landingPage/contextStrore/answerContextProvider';
import VoiceContextProvider from '../components/landingPage/contextStrore/voiceContextProvider';
import AuthContextProvider from '@/components/landingPage/contextStrore/authContextProvider';
import HomeContextProvider from '@/components/landingPage/contextStrore/homeContextProvider';
const App = ({ Component, pageProps, router }) => {


  return (
    <>
       <Head>
          <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;700&display=swap" rel="stylesheet" />
        </Head>

      <Script>
        {
          ` (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:3406143,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
        }
      </Script>


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
