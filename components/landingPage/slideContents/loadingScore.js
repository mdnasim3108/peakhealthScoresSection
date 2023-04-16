import Slider from "@mui/material/Slider";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DynamicText from "./dynamicText";
import voiceContext from "../contextStrore/voiceContext";
import { useContext } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
const loadingScore = () => {
  const voiceState=useContext(voiceContext)
  const CustomSlider = createTheme({
    overrides: {
        root: {
            color: "#52af77",
            height: 8
          },
        MuiSlider:{
            thumb: {
                height: 50,
                width: 50,
              },
        }
    },
  });
  //   const CustomSlider = withStyles({
  //     thumb: {
  //       height: 30,
  //       width: 30,
  //     },
  //   })(Slider);
  return (
    <div className="bg-gray-200 opacity-50 lg:h-full h-[100vh] sm:pt-10 py-[20%] text-center">
      <h1 className="sm:text-xl text-lg ">Your Stress Assistant AI is...</h1>
      <DynamicText
        texts={[
          " analyzing your voice",
          "computing your stress level",
          "generating your stress report",
        ]}
      />
      <h1 className="sm:text-2xl text-lg font-sans font-bold mt-[5rem] mb-5">
        Can you guess, what's your stress level!!!
      </h1>
      <p className="relative bottom-5">(Slide the marker)</p>
      <div className="sm:w-[70%] w-[90%] mx-auto">
        <ThemeProvider theme={CustomSlider}>
            <Slider id="slider"
            className="horizontal-slider"
            onChange={(e) => voiceState.guessScore(e.target.value)}
            />
        </ThemeProvider>
        <div className="flex justify-between relative bottom-3 text-[0.7rem] sm:text-lg">
          <p>Low Stress</p>
          <p>Medium Stress</p>
          <p>high Stress</p>
        </div>
      </div>
    </div>
  );
};
export default loadingScore;
