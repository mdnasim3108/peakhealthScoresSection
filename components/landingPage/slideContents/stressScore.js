import LoadingScore from "./loadingScore";
import Results from "./results";
import { useContext } from "react";
import voiceContext from "../contextStrore/voiceContext";
const StressScore = (props) => {

  const voiceState = useContext(voiceContext);

  return (
    <>
      {voiceState.voiceFeatures.loading && <LoadingScore />}
      {!voiceState.voiceFeatures.loading && !voiceState.voiceFeatures.error && <Results move={props.move} />}
    </>

  )
};
export default StressScore;
