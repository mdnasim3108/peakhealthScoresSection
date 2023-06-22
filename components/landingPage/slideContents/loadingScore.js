import Slider from "@mui/material/Slider";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DynamicText from "./dynamicText";
import voiceContext from "../contextStrore/voiceContext";
import { useContext } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
const loadingScore = () => {
  const voiceState = useContext(voiceContext)
  const CustomSlider = createTheme({
    overrides: {
      root: {
        color: "#905cf4",
        height: 8
      },
      MuiSlider: {
        root: {
          color:'#8b5cf6' ,
        },
        thumb: {
          height: 50,
          width: 50,
        },
      }
    },
  });
  const useStyles = makeStyles({
    thumb: {
      color: "#3F4FDB",
      backgroundColor: '#3F4FDB', // Set the desired color here
    },
    rail: {
      color: "#3F4FDB",
      backgroundColor: '#3F4FDB', // Set the desired color here
    },
    track: {
      color: "#3F4FDB",
      backgroundColor: '#3F4FDB', // Set the desired color here
    },
  });
  const classes = useStyles();
  //   const CustomSlider = withStyles({
  //     thumb: {
  //       height: 30,
  //       width: 30,
  //     },
  //   })(Slider);
  return (
    <div className="bg-gray-200 opacity-50 lg:h-full h-[100vh] sm:pt-10 py-[20%] text-center -z-10">
      <h1 className="sm:text-2xl text-lg ">Your Stress Assistant AI is...</h1>
      <DynamicText
        texts={[
          " analyzing your voice",
          "computing your stress level",
          "generating your stress report",
        ]}
        classes="sm:text-2xl text-lg"
      />
      <h1 className="sm:text-2xl text-lg font-sans font-bold mt-[5rem] mb-5">
        Can you guess, what's your stress level!!!
      </h1>
      <p className="relative bottom-5 text-lg">(Slide the marker)</p>
      <div className="sm:w-[70%] w-[90%] mx-auto">
        <ThemeProvider>
          <Slider
            classes={{
              thumb: classes.thumb,
              rail: classes.rail,
              track: classes.track,
            }}
            
            onChange={(e) => voiceState.guessScore(e.target.value)}
          />
        </ThemeProvider>


        <div className="flex justify-between relative bottom-3 text-[0.7rem] sm:text-lg">
          <p>Low Stress</p>
          <p>Medium Stress</p>
          <p>High Stress</p>
        </div>
      </div>
    </div>
  );
};
export default loadingScore;
