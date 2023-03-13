import LoadingScore from "./loadingScore";
import Results from "./results";
import { useContext } from "react";
import voiceContext from "../contextStrore/voiceContext";
const StressScore = (props) => {
  
  const voiceState = useContext(voiceContext);

  return voiceState.voiceFeatures.loading ? <LoadingScore/> : <Results move={props.move}/>;
};
export default StressScore;
