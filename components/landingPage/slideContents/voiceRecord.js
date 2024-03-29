import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import audioWave from "../../../public/AudioWave.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useContext, useEffect, useState, useRef } from "react";
import voiceContext from "../contextStrore/voiceContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { WavRecorder } from "webm-to-wav-converter";
import DynamicText from "./dynamicText";
// import checkMicrophoneConflict from "@/utils/micCheck";
const VoiceRecord = (props) => {

  const toastifyFailure = (str) => {
    toast.error(str, {
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

  const questions=[
      "How has stress impacted your work, causing missed deadlines or errors?",
      "How do you feel stress is affecting your social interactions and relationships with others?",
      "How do you feel stress impacts your confidence and self-worth?",
      "Have you noticed any changes in your health due to work stress?",
      "Is job stress affect your eating or sleep in any way?",
      "Can you describe any changes in your level of motivation or interest?",
      "Can you identify any recurring emotions you experience during stressful situations?"

  ]
  const [questionIndex,setQuestionIndex]=useState(Math.floor(Math.random()*questions.length))

  const voiceState = useContext(voiceContext);

  const [status, setStatus] = useState("")
  const ref = useRef()
  const buttonRef = useRef(null)
  function handleClick() {
    setTimeout(async () => {
      props.move()
      const audio = await ref.current.getBlob()
      console.log(audio)
      voiceState.sendAudio(audio)
      const url = URL.createObjectURL(audio)
      console.log(url)
    }, 100)
  }

  function simulateClick() {
    buttonRef.current.click()
  }
  // useEffect(()=>{
  //   checkMicrophoneConflict()
  // })
  useEffect(() => {
    ref.current = new WavRecorder()
  }, [])
  const voiceClickHandler = async () => {
    // if(await isMicrophoneInUse()){
    //   toastifyFailure("your mic is currently in use by other apps..")
    //   return
    // }
    await navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setStatus("recording");
        ref.current.start()
      })
      .catch((err) => {
        toastifyFailure("Enable microphone access in your browser to record");
      });
  };

  return (
    <>
      <h1 className="sm:text-[40px] text-[30px]  sm:relative top-5 sm:top-0 font-bold  font-rajdhani text-center">
        Question Of The Day
      </h1>
      <div className="voiceRecord flex justify-between lg:flex-row flex-col-reverse sm:mt-0 mt-8">
        <ToastContainer />
        <div className="px-10 py-10 mt-10 lg:w-[80%] h-max   border-2 rounded shadow-lg">
          <div className="">
            <h1 className="text-xl font-bold tracking-wide text-center">INSTRUCTIONS</h1>
            <ul className="text-left list-disc mt-8 text-lg text-gray-500 ">
              <li className="mb-6">
                <p className="">Find a quiet place</p>
              </li>
              <li className="mb-6">
                <p className="">Answer question in your normal voice</p>
              </li>
              <li className="mb-6">
                <p className="">Speak freely and honestly</p>
              </li>
              <li className="mb-6">
                <p className="">Your privacy is protected</p>
              </li>
              <li className="">
                <p className="">Your data is not shared with anyone</p>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`${status === "mt-[2rem]" ? "" : "sm:mt-[3rem]"
            } transition-all  duration-[300] lg:ml-[3rem] ease-linear text-center`}
        >
          <p className="mt-5 sm:text-[36px] text-[30px] ">
            {questions[questionIndex]}
          </p>

          {status === "" && (
            <div className="">
              <button
                id="microphone" 
                onClick={voiceState.voiceFeatures.registered && voiceClickHandler}
                className={`sm:w-[6rem] sm:h-[6rem] w-[5rem] h-[5rem] ${!voiceState.voiceFeatures.registered ? "bg-gray-500" : " bg-[#3F4FDB] hover:bg-[#3F4FDB] hover:scale-125 onepulse"}   transition-all duration-75 ease-linear  cursor-pointer shadow-2xl rounded-full flex items-center justify-center mt-10 mx-auto`}
                disabled={!voiceState.voiceFeatures.registered}
              >
                <FontAwesomeIcon
                  icon={faMicrophone}
                  className="text-4xl text-white"
                />
              </button>
              <p className="text-lg text-gray-500 mt-4">
                {voiceState.voiceFeatures.registered ? "Click to record" :
                  <DynamicText texts={["getting things ready","almost there...","read these instructions"]} classes="text-lg" />}
              </p>
            </div>
          )}

          {status === "recording" && (
            <div className="flex justify-end flex-col mt-10 recording">
              <p className="font-sans text-lg">Please speak for 30 seconds</p>
              <Player
                autoplay
                loop
                src={audioWave}
                className="w-[150px] h-[150px] relative bottom-5"
              ></Player>
              <div className="flex justify-center relative bottom-10">
                <CountdownCircleTimer
                  isPlaying
                  duration={30}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[7, 5, 2, 0]}
                  size={80}
                  strokeWidth={5}
                  onComplete={() => {
                    ref.current.stop()
                    simulateClick()
                  }}
                >
                  {({ remainingTime }) => {
                    return (
                      <div
                        onClick={() => {
                          ref.current.stop()
                          simulateClick()
                        }}
                        className="w-[4.2rem] h-[4rem] mr-2 bg-[#3F4FDB] hover:bg-[#3F4FDB] transition-all duration-75 ease-linear  cursor-pointer shadow-lg rounded-full flex items-center justify-center  ml-2"
                      >
                        <FontAwesomeIcon
                          icon={faSquare}
                          mask="sharp"
                          className="text-white text-3xl"
                        />
                      </div>
                    );
                  }}
                </CountdownCircleTimer>
              </div>
            </div>
          )}

          <button
            id="btn"
            className="border hidden border-violet-500 bg-violet-500 hover:bg-violet-600 text-white font-bold uppercase mt-5 w-full py-3 rounded outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
            ref={buttonRef} onClick={handleClick}>
            Get scores
          </button>

        </div>
      </div>
    </>
  );
};
export default VoiceRecord;