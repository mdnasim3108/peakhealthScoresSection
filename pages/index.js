import LandingPage from '../components/landingPage/landingPage';
import Modal from '@/components/landingPage/UI/modal';
import ContentContextProvider from '@/components/landingPage/contextStrore/contentContextProvider';
import voiceContext from '@/components/landingPage/contextStrore/voiceContext';
import { useContext } from 'react';
export default function Home() {
  const voiceState = useContext(voiceContext)
  return (
    <ContentContextProvider>
      <div className="App h-[100vh]">
        {voiceState.voiceFeatures.error  &&  <div className='flex absolute w-full justify-center items-center h-[100vh]'>
          <Modal {...voiceState.voiceFeatures.errorData} />
        </div>}
        <LandingPage />
      </div>
    </ContentContextProvider>
  )
}
