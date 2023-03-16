import '@/styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'

// import { GoogleAnalytics } from 'nextjs-google-analytics'
const App = ({ Component, pageProps }) => {


  return (
    <>
   
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-64VSBXJZV4"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
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
