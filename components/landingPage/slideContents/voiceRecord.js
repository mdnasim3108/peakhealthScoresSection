import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import audioWave from "../../../public/AudioWave.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useContext, useEffect, useState, useRef } from "react";
import voiceContext from "../contextStrore/voiceContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Buffer } from "buffer";
import { WavRecorder } from "webm-to-wav-converter";
const VoiceRecord = (props) => {
  const toastifyFailure = () => {
    toast.error("Enable microphone access in your browser to record", {
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
  const voiceState = useContext(voiceContext);
  // const [record, setRecord] = useState({ audio: null, isRecording: false });

  const [status, setStatus] = useState("")
  const ref = useRef()
  useEffect(() => {
    ref.current = new WavRecorder()
  }, [])
  const voiceClickHandler = async () => {
    await navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setStatus("recording");
        ref.current.start()
      })
      .catch((err) => {
        toastifyFailure();
      });
  };
  // const onStop =async(audio) => {
  //   // var reader = new FileReader();
  //   // reader.readAsDataURL(audio.blob);
  //   // reader.onloadend = () => {
  //   //   var base64data = reader.result;
  //   //   console.log(base64data);
  //   // }
  //   console.log(audio);
  //   // const abuffer = await audio.blob.arrayBuffer();
  //   // const mybuffer = Buffer.from(abuffer, "binary");
  //   // console.log(mybuffer)
  //   // const base=mybuffer.toString("base64")
  //   // const baseBuffer=Buffer.from(base,"base64")
  //   voiceState.sendAudio(audio.blob);
  // };
  return (
    <>
      <h1 className="sm:text-4xl text-2xl  relative top-5 sm:top-0 font-bold  font-sans text-center">
        Question Of The Day
      </h1>
      <div className="voiceRecord relative flex justify-between md:flex-row flex-col-reverse sm:mt-0 mt-8">
        <ToastContainer />
        <div className="px-10 py-10 mt-20 w-full   border-2 rounded shadow-lg">
          <div className="">
            <h1 className="text-lg font-bold tracking-wide text-center">INSTRUCTIONS</h1>
            <ul className="text-left list-disc mt-8 ">
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
          className={`${status === "" ? "sm:mt-[8rem]" : "sm:mt-[6rem]"
            } transition-all  duration-[300] lg:ml-[3rem] ease-linear text-center`}
        >
          <p className="mt-5 font-bold sm:text-3xl text-xl">
            How are you feeling about your workload today?
          </p>
          {/* <AudioReactRecorder
            canvasWidth={0}
            canvasHeight={0}
            state={record.audio}
            onStop={onStop}
          /> */}

          {status === "" && (
            <div
              onClick={voiceClickHandler}
              class="sm:w-[6rem] sm:h-[6rem] w-[5rem] h-[5rem] bg-violet-500 hover:bg-violet-600 hover:scale-125 transition-all duration-75 ease-linear  cursor-pointer shadow-2xl rounded-full flex items-center justify-center mt-10 mx-auto"
            >
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-4xl text-white"
              />
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
                    setStatus("stop")
                    setTimeout(() => {
                      props.move();
                    }, 300);
                  }}
                >
                  {({ remainingTime }) => {
                    return (
                      <div
                        onClick={() => {
                          ref.current.stop()
                          setStatus("stop")
                          // setTimeout(() => {
                          //   props.move();
                          // }, 300);
                        }}
                        className="w-[4.2rem] h-[4rem] mr-2 bg-violet-500 hover:bg-violet-600 transition-all duration-75 ease-linear  cursor-pointer shadow-lg rounded-full flex items-center justify-center  ml-2"
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
          {status === "stop" &&
            <button
              className="border border-violet-500 bg-violet-500 hover:bg-violet-600 text-white font-bold uppercase mt-5 w-full py-3 rounded outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
              onClick={async () => {
                const audio=await ref.current.getBlob()
                const url=URL.createObjectURL(audio)
                console.log(url)
                voiceState.sendAudio(audio)
                props.move()
              }
              }>
              Get scores
            </button>
          }
        </div>
      </div>
    </>
  );
};
export default VoiceRecord;
