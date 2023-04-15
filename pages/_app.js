import '@/styles/globals.css'


import Script from 'next/script'
import AnswerContextProvider from '../components/landingPage/contextStrore/answerContextProvider';
import VoiceContextProvider from '../components/landingPage/contextStrore/voiceContextProvider';


const App = ({ Component, pageProps }) => {

 
  return (
    <>

<Script>
  {
   `    (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:3406143,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
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
      {/* <!-- Google Tag Manager --> */}
<Script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KVK8C36');`}</Script>
{/* <!-- End Google Tag Manager --> */}

      {/* <GoogleAnalytics gaMeasurementId='G-64VSBXJZV4' /> */}

      <VoiceContextProvider>
        <AnswerContextProvider>
          <Component {...pageProps} />
        </AnswerContextProvider>
      </VoiceContextProvider>
    </>
  )
}

export default App
