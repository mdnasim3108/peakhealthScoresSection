import { useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import voiceContext from "../contextStrore/voiceContext";
import axios from "axios";
const ReactSpeedometer = dynamic(() => import("react-d3-speedometer"), {
  ssr: false,
});
const results = (props) => {
  const voiceState = useContext(voiceContext);
  console.log(voiceState.voiceFeatures);
  axios.post("/api/guessScore", {
    guessScore: voiceState.voiceFeatures.guessScore,
    id:voiceState.voiceFeatures.objId
  });
  const overallScore = voiceState.voiceFeatures.loading
    ? voiceState.voiceFeatures.score
    : 40;
  const labels = [
    {
      text: "Bad",
      position: "INSIDE",
      color: "#555",
    },
    {
      text: "Good",
      position: "INSIDE",
      color: "#555",
    },
    {
      text: "Great",
      position: "INSIDE",
      color: "#555",
    },
    {
      text: "Awesome",
      position: "INSIDE",
      color: "#555",
    },
  ];
  return (
    <div className=" px-0 md:px-10 recording md:relative text-center">
      <h1 className="xl:text-4xl lg:text-2xl text-xl font-bold">
        Your Work Stress Score for today
      </h1>
      <div className="xl:w-full lg:w-[90%]">
      <div className="bg-gradient-to-r mt-20 rounded flex justify-end from-green-600 via-orange-500 to-red-500 scoreFill  sm:h-8 h-5 transition-all duration-500 ease-linear ">
        <div
          className="h-full bg-gray-200  overlay rounded-r"
          style={{ width: `${100 - overallScore}%` }}
        ></div>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-gray-400">Low Stress</p>
        <p className="text-sm text-gray-400">Medium Stress</p>
        <p className="text-sm text-gray-400">High Stress</p>
      </div>
      </div>
      <div className="flex justify-center items-center md:justify-around md:flex-row flex-col mt-[3rem]">
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
          width={350}
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
          width={350}
          ringWidth={40}
        />
        </div>
      </div>
      <div className="relative bottom-20">
        <button
          className="rounded border-violet-500 bg-violet-500 hover:bg-violet-600 mt-3 sm:p-2 p-1 text-white sm:text-lg text-sm font-sans"
          onClick={props.move}
        >
          Check my personalized recommendations
        </button>
      </div>
    </div>
  );
};
export default results;
