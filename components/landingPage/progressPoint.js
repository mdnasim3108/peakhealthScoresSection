import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress } from "@mui/material";
const progressPoint = (props) => {
  const classes = `${
    props.progress.working || props.progress.completed ? "text-[#6ed1f9]" : "text-gray-400"
  }`;
  return (
    <div className="flex flex-col lg:flex-row w-full relative top-4">
      <div className="hidden lg:flex lg:flex-row flex-col w-max">  
        <FontAwesomeIcon
          icon={props.icon}
          className={`text-xl mt-2 mr-4 ${classes} transition-all duration-300 ease-linear`}
        />
        <div>
          <p
            className={` font-[4rem] ${classes} transition-all duration-300 ease-linear w-[8rem] text-center`}
          >
            {props.progress.label}
          </p>
        </div>
      </div>

      <div className="flex flex-row lg:flex-col lg:w-[3rem]  w-full items-center"> 
      {/* <CircularProgress variant="determinate"  value={100} size={20} className=" text-[#6ed1f9]" /> */}

        {/* <div
          className={` w-[15px] h-[15px] md:w-[20px] md:h-[20px] ${
            props.progress.working ? "bg-[#6ed1f9]" : "bg-gray-200"
          } rounded-full flex items-center  justify-center transition-all duration-300 ease-linear`}
        >
          {!props.progress.completed?<div
            className={` flex items-center justify-center md:w-[15px] md:h-[15px] relative top-[0.1px] md:left-[0.3px] ${
              props.progress.working  ? "bg-white" : "bg-gray-200"
            } 
            ${props.progress.animate && "pulse"}
             rounded-full transition-all duration-600 ease-linear`}
          >
          </div>:<FontAwesomeIcon className="text-[0.7rem] text-white" icon={faCheck}/>}
        </div> */}

        {props.progress.working  && <div className="rounded-full pulse shrink-0  lg:w-[20px] lg:h-[20px] w-[18px] h-[18px]  border-[3px] border-blue-400"/>}

        {props.progress.completed &&
        <div className="bg-[#6ed1f9] lg:w-[20px] lg:h-[20px] w-[18px] h-[18px] shrink-0 rounded-full flex items-center  justify-center transition-all duration-300 ease-linear">
             <FontAwesomeIcon className="text-[0.7rem] text-white" icon={faCheck}/>
        </div>
        }

        {!props.progress.working && !props.progress.completed && <div className="bg-gray-200 px-2 shrink-0 rounded-full lg:w-[20px] lg:h-[20px] w-[18px] h-[18px]" />}
        

        
        {!props.progress.notextend && <div class="lg:h-[7.5rem] lg:w-[0.15rem] h-[0.18rem] w-full bg-gray-200 border-0 rounded">
          <div
            className={`w-full   transition-all duration-[600ms] ease-linear bg-[#6ed1f9] ${
              props.progress.completed ? "lg:w-full h-full" : "lg:h-[0rem] w-[0rem]"  
            }`}
          />
        </div>  }

      </div>
    </div>
  );
};
export default progressPoint;