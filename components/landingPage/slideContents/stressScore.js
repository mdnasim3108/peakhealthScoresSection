// import ReactSpeedometer from "react-d3-speedometer";
import { useState, useContext } from "react";
import dynamic from "next/dynamic";
import voiceContext from "../contextStrore/voiceContext";
const ReactSpeedometer = dynamic(() => import("react-d3-speedometer"), {
  ssr: false,
});
const StressScore = (props) => {
  const voiceState = useContext(voiceContext);
  const overallScore = !voiceState.voiceFeatures.loading
    ? voiceState.voiceFeatures.score
    : 50;
  const labels = [
    {
      text: "Very Bad",
      position: "INSIDE",
      color: "#555",
    },
    {
      text: "Bad",
      position: "INSIDE",
      color: "#555",
    },
    {
      text: "Ok",
      position: "INSIDE",
      color: "#555",
      fontSize: "19px",
    },
    {
      text: "Good",
      position: "INSIDE",
      color: "#555",
    },
    {
      text: "Very Good",
      position: "INSIDE",
      color: "#555",
    },
  ];
  const results = (
    <div className=" px-0 md:px-10 recording md:relative top-10 text-center">
      <h1 className="xl:text-4xl lg:text-2xl font-bold font-serif">
        Your Work Stress Score for today
      </h1>
      <div className="bg-gray-400 w-full h-8 rounded-full mt-10">
        <div
          className="h-full transition-all duration-500 ease-linear rounded-full bg-gradient-to-r from-red-600 to-green-500 scoreFill"
          style={{ width: `${overallScore}%` }}
        ></div>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-gray-400">High Stress</p>
        <p className="text-sm text-gray-400">Medium Stress</p>
        <p className="text-sm text-gray-400">Low Stress</p>
      </div>
      <div className="flex justify-center items-center md:justify-around md:flex-row flex-col">
        <ReactSpeedometer
          value={
            !voiceState.voiceFeatures.loading &&
            +voiceState.voiceFeatures.energy * 10
          }
          currentValueText="Energy"
          customSegmentLabels={labels}
          labelFontSize="10px"
        />
        <ReactSpeedometer
          value={
            !voiceState.voiceFeatures.loading &&
            +voiceState.voiceFeatures.control * 10
          }
          currentValueText="Control"
          customSegmentLabels={labels}
          labelFontSize="10px"
        />
      </div>
      <div className="relative bottom-20">
        <h1 className="text-xl font-sans font-bold mb-10">
          Unmanaged Stress can lead to Burnout
        </h1>
        <button
          className="rounded bg-green-500 p-2 text-white text-lg font-sans"
          onClick={props.move}
        >
          Check my Burnout Level
        </button>
      </div>
    </div>
  );
  const loadContent = (
    <div className="bg-gray-200 opacity-50 flex justify-center items-center h-full">
      <h1 className="text-lg font-sans font-bold status">
        {voiceState.voiceFeatures.loading && voiceState.voiceFeatures.status}
      </h1>
    </div>
  );

  return voiceState.voiceFeatures.loading ? loadContent : results;
};
export default StressScore;
