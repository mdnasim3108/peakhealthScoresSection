import getStartImage from "../../../public/getStart.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState } from "react";
const GetStarted = (props) => {
  const [showArrow, setShowArrow] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl">What’s my Work Stress level?</h1>
      <h2 className="text-xl text-gray-500 relative bottom-5">
        Find out with Science and AI powered Stress Assistant!{" "}
      </h2>
      <Image src={getStartImage} className="xl:w-[16rem] md:w-[16rem]" alt="getStart" />
      <h1 className="text-blue text-lg mb-2">STEP 1</h1>
      <p className="font-sans text-lg mb-5 text-center">
        Our
        AI-powered Stress Assistant measures your stress level and generates
        personalized recommendations for you
      </p>
      <p className="font-sans text-lg text-center">
      Don't let job stress control you - take control today!
      </p>
      <button
        className="border text-lg border-violet-500 bg-violet-500 relative top-5 hover:bg-violet-600 text-white font-bold px-8 py-3 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        onMouseEnter={() => setShowArrow((prev) => !prev)}
        onMouseLeave={() => setShowArrow((prev) => !prev)}
        onClick={props.move}
      >
        Start my 1 min Stress Check
        {showArrow && (
          <i className="ml-[0.5rem] arrowIcon">
            <FontAwesomeIcon icon={faArrowRight} />
          </i>
        )}
      </button>
    </div>
  );
};
export default GetStarted;
