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
      const media = window.matchMedia(`(max-width: ${width}px)`);
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
      text: "Bad",
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
    <div className=" px-0 md:px-10 recording md:relative text-center">
      <h1 className="xl:text-3xl lg:text-2xl font-rajdhani text-xl font-bold">
        Your Work Stress Score for today
      </h1>
      <div className="xl:w-full lg:w-[90%]">
        <div className="bg-gradient-to-r mt-10 rounded flex justify-end from-green-600 via-orange-500 to-red-500 scoreFill  sm:h-8 h-5 transition-all duration-500 ease-linear ">
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
      <div className="flex justify-center items-center md:justify-around md:flex-row flex-col">
        <div className="">
          <ReactSpeedometer
            value={
              !voiceState.voiceFeatures.loading
                ? voiceState.voiceFeatures.energy
                : 0
            }
            minValue={0}
            maxValue={36}
            segments={4}
            currentValueText="Energy"
            customSegmentLabels={labels}
            segmentColors={["#ff927e", "#17ffec", "#bee74b", "#7bda40"]}
            width={!isBreakpoint ? 330 : 300}
            ringWidth={40}
          />
        </div>
        <div>
          <ReactSpeedometer
            value={
              !voiceState.voiceFeatures.loading
                ? Number(voiceState.voiceFeatures.live)
                : 0
            }
            minValue={0}
            maxValue={0.45}
            segments={4}
            currentValueText="Liveliness"
            customSegmentLabels={labels}
            segmentColors={["#ff927e", "#17ffec", "#bee74b", "#7bda40"]}
            width={!isBreakpoint ? 350 : 300}
            ringWidth={40}
          />
        </div>
      </div>

      <div className="relative bottom-[3.5rem]">
        <div className="sm:flex-row flex-col justify-center mb-3">
          <button
            onClick={() =>{ 
              authState.change({ showAuth: true, signUp: true })
              scrollToTop() 
          }}
            className="rounded-lg sm:mr-5 border-[#3F4FDB] bg-[#3F4FDB] hover:bg-[#3F4FDB] text-white mt-3 py-2 sm:px-2 px-[5rem] sm:text-lg text-sm ease-linear transition-all duration-150 font-sans">
            Get Detailed Report
          </button>
          <button
            id="personalizedRecommendation"
            className="rounded-lg border-2 border-[#3F4FDB] hover:bg-[#3F4FDB] hover:text-white mt-3 p-2 text-[#3F4FDB] sm:text-lg text-sm ease-linear transition-all duration-150 font-sans"
            onClick={props.move}
          >
            Check my personalized recommendations
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
