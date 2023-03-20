import '@/styles/globals.css'
import Head from 'next/head'

import Script from 'next/script'


const App = ({ Component, pageProps }) => {
// googleAnalytics_id = G-64VSBXJZV4

  return (
    <>

{/* <!-- Hotjar Tracking Code for https://check.peakhealth.tech --> */}
<Script>
  {
   `(function(h,o,t,j,a,r){
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
     
{/* <GoogleAnalytics gaMeasurementId='G-64VSBXJZV4' /> */}

      <Component {...pageProps} />
    </>
  )
}

export default App
