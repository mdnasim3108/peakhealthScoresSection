import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress } from "@mui/material";
import { RecordVoiceOver } from "@mui/icons-material";
import RecommendIcon from '@mui/icons-material/Recommend';
const progressPoint = (props) => {
  const classes = `${props.progress.working || props.progress.completed ? "text-[#6ed1f9]" : "text-gray-400"
    }`;
  return (
    <div className={`flex flex-col lg:flex-row  w-full relative right-6 md:right-0`}>
      <div className="hidden lg:flex lg:flex-row flex-col w-full justify-between">
        {props.icon === "voice" && props.progress.mate && <RecordVoiceOver className={`text-2xl mt-2  ${classes} transition-all duration-300 ease-linear`}
        />}

        {props.icon === "recommend" && props.progress.mate && <RecommendIcon className={`text-2xl mt-2  ${classes} transition-all duration-300 ease-linear`}
        />}

        {!props.progress.mate && <FontAwesomeIcon
          icon={props.icon}
          className={`text-xl mt-2 ${classes} transition-all duration-300 ease-linear`}
        />}
        <div>
          <p
            className={` font-[4rem] ${classes} transition-all duration-300 ease-linear w-[8rem] text-center`}
          >
            {props.progress.label}
          </p>
        </div>
      </div>

      <div className="flex flex-row lg:flex-col lg:w-[3rem]  w-full items-center">

        {props.progress.working && <div className="rounded-full pulse shrink-0  lg:w-[20px] lg:h-[20px] w-[18px] h-[18px]  border-[3px] border-blue-400" />}

        {props.progress.completed &&
          <div className="bg-[#6ed1f9] lg:w-[20px] lg:h-[20px] w-[18px] h-[18px] shrink-0 rounded-full flex items-center  justify-center transition-all duration-300 ease-linear">
            <FontAwesomeIcon className="text-[0.7rem] text-white" icon={faCheck} />
          </div>
        }

        {!props.progress.working && !props.progress.completed && <div className="bg-gray-200 px-2 shrink-0 rounded-full lg:w-[20px] lg:h-[20px] w-[18px] h-[18px]" />}



        {!props.progress.notextend && <div className="lg:h-[15vh] lg:w-[0.15rem] h-[0.18rem] w-full bg-gray-200 border-0 rounded">
          <div
            className={`w-full   transition-all duration-[600ms] ease-linear bg-[#6ed1f9] ${props.progress.completed ? "lg:w-full h-full" : "lg:h-[0rem] w-[0rem]"
              }`}
          />
        </div>}

      </div>
    </div>
  );
};
export default progressPoint;