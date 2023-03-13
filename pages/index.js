import AnswerContextProvider from '../components/landingPage/contextStrore/answerContextProvider';
import VoiceContextProvider from '../components/landingPage/contextStrore/voiceContextProvider';
import LandingPage from '../components/landingPage/landingPage';
export default function Home() {
  return (
    <VoiceContextProvider>
    <AnswerContextProvider>
    <div className="App h-[100vh]">
        <LandingPage/>
    </div>
    </AnswerContextProvider>
    </VoiceContextProvider>
  )
}
