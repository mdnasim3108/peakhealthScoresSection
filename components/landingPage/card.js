import ProgressPoint from "./progressPoint";
import {
  faPowerOff,
  faCheck,
  faMedal,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import GetStarted from "./slideContents/getStarted";
import VoiceRecord from "./slideContents/voiceRecord";
import GetDetails from "./slideContents/getDetails";
import { useState, useContext, useEffect } from "react";
import Quiz from "./slideContents/quiz";
import MoreDetails from "./slideContents/moreDetails";
import StressScore from "./slideContents/stressScore";
import Recommendations from "./slideContents/recommondations";
import ReviewBurnout from "./slideContents/reviewBurnout";
import ContentContext from "./contextStrore/contentContext";
import authContext from "./contextStrore/authContext";
import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import Image from "next/image";
import logoImg from "../../public/phLogo.png"
import aiText from "../../public/AIText.png"
import Home from "./Home";
import homeContext from "./contextStrore/homeContext";
const Card = () => {
  const content = useContext(ContentContext)
  const authState = useContext(authContext)
  const [showAuth, setShowAuth] = useState({ auth: false, signUp: false })
  const [showHome, setShowHome] = useState(true)
  const nextPartHandler = () => {
    setProgressBarState(
      { contentNumber: 0, contentArray: contentArray2 }
    )
  };
  const homeState = useContext(homeContext)
  const moveToNext = () => { }

  useEffect(() => {
    setProgressBarState((prev) => {
      const updated = [...prev.contentArray];
      const num = content.contentNumber;
      console.log(num)
      const updated1 = updated.map((el) => {
        const id = prev.contentArray.indexOf(el)
        if (id === num) {
          return { ...el, working: true, animate: true, completed: false }
        }
        if (id < num) {
          return { ...el, working: false, completed: true, animate: false }
        }
        return { ...el, animate: false, working: false, completed: false }
      })
      return { contentNumber: prev.contentNumber + 1, contentArray: updated1 };
    });
  }, [content.contentNumber])

  const moveHandler = () => {
    content.moveContent()
  }

  const [progressBarState, setProgressBarState] = useState({
    contentNumber: 0,
    contentArray: [
      {
        com: <GetStarted move={moveHandler} onclick={() => authState.change({ showAuth: true, signIn: true })} />,
        working: true,
        completed: false,
        animate: true,
        label: "Get started",
        icon: faPowerOff,
      },
      {
        com: <GetDetails move={moveHandler} />,
        working: false,
        completed: false,
        animate: false,
        label: "Give your details",
        icon: faClipboardCheck,
      },
      {
        com: <VoiceRecord move={moveHandler} />,
        working: false,
        completed: false,
        animate: false,
        label: "Check your stress",
        icon: "voice",
        mate: true,
      },
      {
        com: <StressScore move={moveHandler} />,
        working: false,
        completed: false,
        animate: false,
        label: "Review your stress score",
        icon: faMagnifyingGlassChart,
      },
      {
        com: <Recommendations move={() => console.log("finished")} onclick={() => authState.change({ showAuth: true, signUp: true })} />,
        working: false,
        completed: false,
        animate: false,
        label: "Your stress relief solutions",
        icon: "recommend",
        mate: true,
        notextend: true
      },
    ],
  });
  const contentArray2 = [
    {
      com: <Quiz move={moveToNext} />,
      working: true,
      completed: false,
      animate: true,
      label: "Your current status",
      icon: faPowerOff,
    },
    {
      com: <MoreDetails move={moveToNext} />,
      working: false,
      completed: false,
      animate: false,
      label: "Check your Burnout level",
      icon: faCheck,
    },
    {
      com: <ReviewBurnout move={moveToNext} />,
      working: false,
      completed: false,
      animate: false,
      label: "Review Your burnout result",
      icon: faMedal,
    },
    {
      com: <Recommendations />,
      working: false,
      completed: false,
      animate: false,
      label: "Top recommendations for you",
      icon: faList,
    },
  ];


  return (
    <div className={` flex-col items-center  lg:h-screen ${homeState.showHome && " overflow-scroll hide-scrollbar "}   sm:w-[88%] w-full bg-white  sm:shadow-2xl  lg:py-7 xl:pl-[4rem] lg:pl-[3rem] lg:pr-[3rem]`}>
      
      {homeState.showHome && <Home check={() => homeState.setShowHome(false)} />}
      {/* {content.contentNumber === 0 && !homeState.showHome && <div className="w-full flex justify-end">
        <button
          className="border-2 absolute tracking-wide text-lg   border-[#3F4FDB] text-[#3F4FDB] hover:text-white  hover:bg-[#3F4FDB]  font-bold px-2 pb-2 rounded-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
          onClick={() => authState.change({ showAuth: true, signIn: true })}
        >
          sign in
        </button>
      </div>} */}

      {!homeState.showHome && <div className="flex lg:flex-row flex-col sm:items-center sm:justify-center py-10 w-full">

        <div className="lg:flex-[1] flex lg:flex-col py-3 z-10  fixed top-0  bg-white pl-[15%]  w-full lg:p-0 lg:relative">

          {/* <div className="md:relative  flex items-center justify-around "
          >
            <Image
              src={logoImg}
              className="md:w-[3rem] w-[10rem]  mr-3"
            />

            <span className="text-lg hidden sm:block text-[#ea7f17] font-bold font-rajdhani">
              Stress
            </span>
            <span className="text-lg hidden sm:block text-[#4855dc] font-bold font-rajdhani">
              Sense
            </span>
            <span className="text-lg hidden sm:block  text-[#4855dc] font-bold font-rajdhani">
              AI
            </span>
          </div> */}
      
          <div
            onClick={() => homeState.setShowHome(true)}

            className="md:relative md:bottom-[5vh] -translate-x-10 sm:-translate-x-[5%] flex items-center justify-between cursor-pointer">
            <Image
              src={logoImg}
              className="md:w-[3rem] w-[10rem]"
            />

            <span className="text-[30px] mr-1 hidden sm:block  text-[#ea7f17] font-bold font-rajdhani">
              Stress
            </span>
            <span className="text-[30px] mr-1 hidden sm:block  text-[#4855dc] font-bold font-rajdhani">
              Sense
            </span>
            <span className="text-[30px]  mr-1 hidden sm:block  text-[#4855dc] font-bold font-rajdhani">
              AI
            </span>
          </div>



          {progressBarState.contentArray.map((el) => {
            return <ProgressPoint icon={el.icon} progress={el} />
          })}
        </div>

        <div className=" w-full   px-5 rounded lg:m-0 mt-5 ">
          <SwitchTransition >
            <CSSTransition
              key={content.contentNumber}
              classNames='fade'
              timeout={300}
            >
              {progressBarState.contentArray[content.contentNumber].com}
            </CSSTransition>
          </SwitchTransition>

        </div>
      </div>
      }
    </div>
  );
};
export default Card;