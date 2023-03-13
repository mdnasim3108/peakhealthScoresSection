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
import { useState } from "react";
import Quiz from "./slideContents/quiz";
import MoreDetails from "./slideContents/moreDetails";
import StressScore from "./slideContents/stressScore";
import Recommendations from "./slideContents/recommondations";
import ReviewBurnout from "./slideContents/reviewBurnout";
const Card = () => {

  const nextPartHandler = () => {
    setProgressBarState(
       { contentNumber: 0, contentArray: contentArray2 }
    )
  };
  const moveToNext = () => {
    setProgressBarState((prev) => {
      const updated = [...prev.contentArray];
      updated[prev.contentNumber] = {
        ...updated[prev.contentNumber],
        completed: true,
        animate: false,
      };
      if (prev.contentNumber !== prev.contentArray.length) {
        updated[prev.contentNumber + 1] = {
          ...updated[prev.contentNumber + 1],
          working: true,
          animate: true,
        };
      }
      return { contentNumber: prev.contentNumber + 1, contentArray: updated };
    });
  };
  
  const [progressBarState, setProgressBarState] = useState({
    contentNumber: 0,
    contentArray: [
      {
        com:<GetStarted move={moveToNext} />,
        working: true,
        completed: false,
        animate: true,
        label: "Get Started",
        icon: faPowerOff,
      },
      {
        com: <GetDetails move={moveToNext} />,
        working: false,
        completed: false,
        animate: false,
        label: "Give your details",
        icon: faMedal,
      },
      {
        com: <VoiceRecord move={moveToNext} />,
        working: false,
        completed: false,
        animate: false,
        label: "Check your Stress score(30sec)",
        icon: faCheck,
      },
      {
        com: <StressScore move={()=>console.log("finished")} />,
        working: false,
        completed: false,
        animate: false,
        label: "Review your stress score",
        icon: faList,
        notextend:true
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
      com: <ReviewBurnout move={moveToNext}/>,
      working: false,
      completed: false,
      animate: false,
      label: "Review Your burnout result",
      icon: faMedal,
    },
    {
      com: <Recommendations/>, 
      working: false,
      completed: false,
      animate: false,
      label: "Top recommendations for you",
      icon: faList,
    },
  ];

 
  return (
    <div className="w-[85%] flex items-center lg:h-[100vh] h-max  max-w-[90%] bg-white  shadow-2xl  lg:py-7 xl:px-[6rem] lg:pl-[2rem]">
      {/* <h1 className="font-sans tracking-wide text-xl font-bold relative top-2">
        PEAK HEALTH
      </h1> */}
      <div className="flex lg:flex-row flex-col py-10 w-full"> 
        <div className="lg:flex-[1] flex lg:flex-col w-auto mx-4" id="progress">
          {progressBarState.contentArray.map((el) => {
            return <ProgressPoint icon={el.icon} progress={el} />;
          })}
        </div>
        <div className=" w-full   px-5 rounded  " id="progressContents">
          {progressBarState.contentArray[progressBarState.contentNumber].com}
          {/* <GetDetails/> */}
        </div>
      </div>
    </div>
  );
};
export default Card;