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
import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import Image from "next/image";
import Auth from "./slideContents/auth";
import logoImg from "../../public/logo2.png"
const Card = () => {
  const content = useContext(ContentContext)
  const [showAuth, setShowAuth] = useState({ auth: false, signUp: false })
  const nextPartHandler = () => {
    setProgressBarState(
      { contentNumber: 0, contentArray: contentArray2 }
    )
  };
  const moveToNext = () => {

  };
  useEffect(() => {
    setProgressBarState((prev) => {
      const updated = [...prev.contentArray];
      // updated[prev.contentNumber] = {
      //   ...updated[prev.contentNumber],
      //   completed: true,
      //   animate: false,
      // };
      // if (prev.contentNumber !== prev.contentArray.length) {
      //   updated[prev.contentNumber + 1] = {
      //     ...updated[prev.contentNumber + 1],
      //     working: true,
      //     animate: true,
      //   };
      // }
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
        com: <GetStarted move={moveHandler} onclick={() => setShowAuth({ auth: true, signUp: false })} />,
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
        label: "Check your stress score(30sec)",
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
        com: <Recommendations move={() => console.log("finished")} onclick={() => setShowAuth({ auth: true, signUp: true })} />,
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
    <div className=" flex items-center  lg:h-screen  sm:w-[88%] w-full bg-white  sm:shadow-2xl  lg:py-7 xl:pl-[4rem] lg:pl-[3rem] lg:pr-[3rem]">
      {/* <h1 className="font-sans tracking-wide text-xl font-bold relative top-2">
        PEAK HEALTH
      </h1> */}
      <div className="flex lg:flex-row flex-col sm:items-center sm:justify-center py-10 w-full">

        <div className="lg:flex-[1] flex lg:flex-col py-5 z-10  fixed top-0  bg-white pl-[15%]  w-full lg:p-0 lg:relative">
          <Image
            src={logoImg}
            className="md:w-[2rem] w-[1.7rem] relative md:bottom-[5vh] bottom-[1vh] right-[13%]"  
          />
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
              {!showAuth.auth ? progressBarState.contentArray[content.contentNumber].com : <Auth confirm={() => setShowAuth({ auth: false, signUp: false })} signUp={showAuth.signUp} />}
            </CSSTransition>
          </SwitchTransition>

        </div>
      </div>
    </div>
  );
};
export default Card;