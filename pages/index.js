import LandingPage from '../components/landingPage/landingPage';
import Modal from '@/components/landingPage/UI/errormodal';
import ContentContextProvider from '@/components/landingPage/contextStrore/contentContextProvider';
import voiceContext from '@/components/landingPage/contextStrore/voiceContext';
import { useContext } from 'react';
import { useEffect } from 'react'
import { browserName } from 'react-device-detect';
import AuthModal from '@/components/landingPage/UI/AuthModal';
import Auth from '@/components/landingPage/slideContents/auth';
import authContext from '@/components/landingPage/contextStrore/authContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
export default function Home() {
  const toastifySuccess = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const toastifyFailure = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const voiceState = useContext(voiceContext)
  const authState = useContext(authContext)
  useEffect(() => {
    if (browserName === "Brave") {
      voiceState.block()
    }
  }, [])
  return (
    <ContentContextProvider>
      <div className="App h-[100vh]">
      <ToastContainer/>
        {voiceState.voiceFeatures.error && <div className='flex absolute w-full justify-center items-center h-[100vh]'>
          <Modal {...voiceState.voiceFeatures.errorData} />
        </div>}

        {
          authState.showAuth &&
          <div className='flex absolute w-full justify-center items-center h-[100vh]'>
            <AuthModal comp={<Auth toastSuccess={toastifySuccess} toastFail={toastifyFailure} />}  />
          </div>
        }

        <LandingPage />
      </div>
    </ContentContextProvider>
  )
}
