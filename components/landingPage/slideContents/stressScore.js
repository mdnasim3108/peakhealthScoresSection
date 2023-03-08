import { useState, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import voiceContext from "../contextStrore/voiceContext";
import Slider from "@mui/material/Slider";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DynamicText from "./dynamicText";
const ReactSpeedometer = dynamic(() => import("react-d3-speedometer"), {
  ssr: false,
});
const StressScore = (props) => {
  const voiceState = useContext(voiceContext);

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
  const useStyles = makeStyles({
    root: {
      width: 200,
    },
  });

  const CustomSlider = withStyles({
    // rail: {
    //   backgroundColor: "gray"

    // },
    // track: {
    //   backgroundImage: "linear-gradient(to right,#76ff03,orange,red)"

    // },
    thumb: {
      height: 30,
      width: 30,
    },
  })(Slider);
  const results = (
    <div className=" px-0 md:px-10 recording md:relative text-center">
      <h1 className="xl:text-4xl lg:text-2xl font-bold">
        Your Work Stress Score for today
      </h1>
      <div className="bg-gradient-to-r mt-20 rounded flex justify-end from-green-600 via-orange-500 to-red-500 scoreFill w-full h-8 transition-all duration-500 ease-linear mt-10">
        <div
          className="h-full bg-gray-200  overlay rounded-r"
          style={{ width: `${100 - overallScore}%` }}
        ></div>
      </div>
      <div className="overlay" />
      <div className="flex justify-between">
        <p className="text-sm text-gray-400">Low Stress</p>
        <p className="text-sm text-gray-400">Medium Stress</p>
        <p className="text-sm text-gray-400">High Stress</p>
      </div>
      <div className="flex justify-center items-center md:justify-around md:flex-row flex-col mt-[3rem]">
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
      <div className="relative bottom-20">
        <button
          className="rounded border-violet-500 bg-violet-500 hover:bg-violet-600 mt-3 p-2 text-white text-lg font-sans"
          onClick={props.move}
        >
          Check my personalized recommendations
        </button>
      </div>
    </div>
  );
  const loadContent = (
    <div className="bg-gray-200 opacity-50  h-full lg:pt-10 text-center">
      <h1 className="text-xl">Your Stress Assistant AI is...</h1>
      <DynamicText
        texts={[
          " analyzing your voice",
          "computing your stress level",
          "generating your stress report",
        ]}
      />
      <h1 className="text-2xl font-sans font-bold mt-[7rem] mb-5">
        Can you guess, what's your stress level!!!
      </h1>
      <p className="relative bottom-5">(Slide the marker)</p>
      <div className="w-[70%] mx-auto">
        <CustomSlider
          className="horizontal-slider h-[1.3rem]"
          mountOnEnter
          unmountOnExit
          onChange={(e) => voiceState.guessScore(e.target.value)}
        />
        <div className="flex justify-between relative bottom-3">
          <p>Low Stress</p>
          <p>Medium Stress</p>
          <p>high Stress</p>
        </div>
      </div>
    </div>
  );

  return voiceState.voiceFeatures.loading ? loadContent : results;
};
export default StressScore;
