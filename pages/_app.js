import '@/styles/globals.css'
import AnswerContextProvider from '../components/landingPage/contextStrore/answerContextProvider';
import VoiceContextProvider from '../components/landingPage/contextStrore/voiceContextProvider';
import { useContext } from 'react'
export default function App({ Component, pageProps }) {
  return (
    <VoiceContextProvider>
      <AnswerContextProvider>
        <Component {...pageProps} />
      </AnswerContextProvider>
    </VoiceContextProvider>
  )
}
