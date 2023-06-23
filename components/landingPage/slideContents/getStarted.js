import getStartImage from "../../../public/getStart.jpg";
import aiText from "../../../public/AIText.png";
import ContentContext from "../contextStrore/contentContext";
import { useContext, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
const GetStarted = (props) => {
  const content = useContext(ContentContext)
  const nodeRef = useRef(null);
  return (
    <div className="" ref={nodeRef}>
      {/* <h1 className="font-bold mb-5 md:text-3xl text-xl font-rajdhani  text-center">What’s my Work Stress level?</h1>
      <h2 className="text-lg text-gray-500 relative bottom-5 text-center">
        Find out with Science and AI powered Stress Assistant!
      </h2> */}
      <div className="flex flex-col-reverse sm:w-full md:flex-row justify-around items-center">
        <div className="flex sm:w-[50%] flex-col items-center mt-4 sm:mt-0">
          <Image
            src={getStartImage}
            className="xl:w-[20rem] md:w-[16rem] w-[15rem]  mb-4"
            alt="getStart"
          />
          <p
            className="font-sans text-lg mb-5 text-center text-gray-500">
            Measure your job stress level in minutes
            using cutting-edge Voice AI technology.
            Take control of your well-being and find
            balance in your busy work life.
          </p>
        </div>
        <div className="flex sm:w-[50%] flex-col items-center justify-start">
          <Image
            src={aiText}
            className="w-[10rem] mb-4"
            alt="getStart"
          />
          <p className="font-sans text-lg mb-5 text-center sm:w-[90%] text-gray-500">
            Your personal AI assistant
            to measure, understand,  
            and conquer stress.
          </p>
          <button
            id="startingButton"
            className=" border border-[#3F4FDB] tracking-wide text-lg hover:bg-[#3F4FDB] bg-[#3F4FDB] text-white hover:text-white   font-bold sm:px-8 sm:py-3 px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            onClick={() => {
              props.move()
            }}
          >
            Start My 1 Min Stress Check
          </button>
          <p className="font-sans text-lg mb-5 text-center text-gray-500 mt-3">
            Free | No signup required
          </p>
          <button
            className="border lg:hidden block mt-4 tracking-wide text-lg bg-[#3F4FDB] border-[#3F4FDB] text-white  hover:bg-[#3F4FDB]  font-bold sm:px-[3.9rem] sm:py-3 px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            onClick={props.onclick}
          >
            Existing user? sign in
          </button>
        </div>
      </div>
    </div>
  );
};
export default GetStarted;
