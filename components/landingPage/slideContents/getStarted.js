import getStartImage from "../../../public/getStart.jpg";
import ContentContext from "../contextStrore/contentContext";
import { useContext,useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState,useEffect } from "react";
import { CSSTransition } from "react-transition-group";
const GetStarted = (props) => {
  const [showArrow, setShowArrow] = useState(true);
  const content=useContext(ContentContext)
  const nodeRef = useRef(null);
  return (
        <div className="" ref={nodeRef}>
      <h1 className="font-bold mb-5 md:text-3xl text-xl  text-center">What’s my Work Stress level?</h1>
      <h2 className="text-lg text-gray-500 relative bottom-5 text-center">
        Find out with Science and AI powered Stress Assistant!
      </h2>
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="flex flex-col items-center">  
          <Image
            src={getStartImage}
            className="xl:w-[20rem] md:w-[16rem] sm:w-[12rem] mb-4"
            alt="getStart"
          />
          <p className="font-sans text-lg mb-5 text-center text-gray-500">
            Our AI-powered Stress Assistant measures your stress level and
            generates personalized recommendations for you
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-sans text-lg mb-5 text-center sm:w-max text-gray-500">
            Don't let job stress control you - take control today!
          </p>
          <button
            id ="startingButton"
            className=" border border-violet-500 tracking-wide text-lg hover:bg-violet-500 text-violet-500 hover:text-white   font-bold sm:px-8 sm:py-3 px-4 py-2 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            onClick={()=>{
              props.move()
            }}
          >
            Start My 1 Min Stress Check
          </button>
          <button
          className="border mt-4 tracking-wide text-lg bg-violet-500 border-violet-500 text-white  hover:bg-violet-600  font-bold sm:px-[3.2rem] sm:py-3 px-4 py-2 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          >
            New user?Register here
          </button>
        </div>
      </div>
    </div>
  );
};
export default GetStarted;
