import LandingPage from '../components/landingPage/landingPage';
import Modal from '@/components/landingPage/UI/modal';
import ContentContextProvider from '@/components/landingPage/contextStrore/contentContextProvider';
import voiceContext from '@/components/landingPage/contextStrore/voiceContext';
import { useContext } from 'react';
import { useEffect } from 'react'
import { browserName } from 'react-device-detect';
export default function Home() {
  const voiceState = useContext(voiceContext)
  useEffect(()=>{
        if(browserName==="Brave"){
            voiceState.block()
        }
  },[])
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
