import { useContext, useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import voiceContext from "../contextStrore/voiceContext";
import axios from "axios";
import authContext from "../contextStrore/authContext";
const ReactSpeedometer = dynamic(() => import("react-d3-speedometer"), {
  ssr: false,
});
const results = (props) => {

  const scrollToTop = () => {
    if (window) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  useEffect(() => {
    scrollToTop()
  }, []);

  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(
        
        max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)  
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeListener(updateTarget);
    }, []);

    return targetReached;
  };
  const isBreakpoint = useMediaQuery(350);
  const voiceState = useContext(voiceContext);
  const authState = useContext(authContext)
  console.log(voiceState.voiceFeatures);
  axios.post("/api/guessScore", {
    guessScore: voiceState.voiceFeatures.guessScore,
    id: voiceState.voiceFeatures.objId
  });
  const labels = [
    {
      text: "Poor",
      position: "INSIDE",
      color: "#555",
      fontSize: "13px"
    },
    {
      text: "Good",
      position: "INSIDE", 
      color: "#555",
      fontSize: "13px"
    },
    {
      text: "Great",
      position: "INSIDE",
      color: "#555",
      fontSize: "13px"
    },
    {
      text: "Awesome",
      position: "INSIDE",
      color: "#555",
      fontSize: "13px"

    },
  ];
  return (
    <div className=" px-0 md:px-10 recording md:relative text-center top-[5vh]">
      <h1 className="xl:text-[40px] lg:text-[40px] font-rajdhani text-xl font-bold">
        Your Work Stress Score for Today
      </h1>
      <div className="xl:w-full lg:w-[90%]">
        <div className="bg-gradient-to-r mt-10 rounded flex justify-end from-[#00C57E] via-[#F2965A] to-[#F25A5A] scoreFill  sm:h-8 h-5 transition-all duration-500 ease-linear ">
          <div
            className="h-full bg-gray-200  overlay rounded-r"
            style={{ width: `${voiceState.voiceFeatures.score}%` }}
          ></div>
        </div>
        <div className="flex justify-between">
          <p className="sm:text-lg text-sm text-gray-400">Low Stress</p>
          <p className="sm:text-lg text-sm text-gray-400">Medium Stress</p>
          <p className="sm:text-lg text-sm text-gray-400">High Stress</p>
        </div>
      </div>
      <div className="flex justify-center relative top-[3vh] items-center md:justify-around md:flex-row flex-col">
        <div className="">
          <ReactSpeedometer
            value={
              !voiceState.voiceFeatures.loading
                ? voiceState.voiceFeatures.energy
                : 0
            }
            minValue={3}
            maxValue={12}
            segments={4}
            currentValueText="Energy"
            customSegmentLabels={labels}
            segmentColors={["#F2965A", "#B0F25A", "#57DD6B", "#00C57E"]}
            width={!isBreakpoint ? 300 : 300}
            ringWidth={40}
          />
        </div>
        <div>
          <ReactSpeedometer
            value={
              !voiceState.voiceFeatures.loading
                ? Number(voiceState.voiceFeatures.liveliness)
                : 0
            }
            
            minValue={0}
            maxValue={0.45}
            segments={4}
            currentValueText="Liveliness"
            customSegmentLabels={labels}
            segmentColors={["#F2965A", "#B0F25A", "#57DD6B", "#00C57E"]}
            width={!isBreakpoint ? 300 : 300}
            ringWidth={40}
          />
        </div>
      </div>

      <div className="relative bottom-[3.5rem] w-full">
        <div className="sm:flex-row w-full flex-col justify-between mb-3">
          <button
            onClick={() =>{ 
              authState.change({ showAuth: true, signUp: true })
              scrollToTop() 
          }}
            className="rounded-lg sm:relative right-[10%] border-[#3F4FDB] bg-[#3F4FDB] w-max font-bold hover:bg-[#3F4FDB]  text-white  py-2 sm:px-[20px]  px-10 text-lg  ease-linear transition-all duration-150 font-sans">
            Get Detailed Report
          </button>
          <button
            id="personalizedRecommendation"
            className="rounded-lg border-2 sm:mt-0 mt-4 sm:relative left-[13.5%] border-[#3F4FDB] font-bold hover:bg-[#3F4FDB] hover:text-white   py-2 px-[20px] w-max text-[#3F4FDB] text-lg ease-linear transition-all duration-150 font-sans"
            onClick={props.move}
          >
            Check recommendations
          </button>
        </div>

        <div className="sm:m-0 mt-8">
          <p className="text-center sm:text-left">Important Disclaimer:</p>
          <p className="text-gray-400 text-left">
            Please note that this stress score is only intended to provide a general indication of your job stress levels and is not intended to be a substitute for professional medical advice, diagnosis, or treatment. If you have any concerns about your stress levels or overall health, please consult with a doctor or a qualified healthcare professional
          </p>
        </div>
      </div>

    </div>
  );
};
export default results;
