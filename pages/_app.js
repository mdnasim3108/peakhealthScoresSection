import '@/styles/globals.css'
import Script from 'next/script'


const App = ({ Component, pageProps }) => {


  return (
    <>
    <Script async  src="https://www.googletagmanager.com/gtag/js?id=G-64VSBXJZV4" ></Script>
    
    <Script>
      { ` 
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-64VSBXJZV4');
        
      `}
    </Script>


      <Component {...pageProps} />
    </>
  )
}

export default App
