import getStartImage from "../../../public/getStart.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState } from "react";
const GetStarted = (props) => {
  const [showArrow, setShowArrow] = useState(false);
  return (
    <div>
      <h1 className="font-bold mb-5 text-4xl text-center">What’s my Work Stress level?</h1>
      <h2 className="text-xl text-gray-500 relative bottom-5 text-center">
        Find out with Science and AI powered Stress Assistant!
      </h2>
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="flex flex-col items-center">
          <Image
            src={getStartImage}
            className="xl:w-[20rem] md:w-[16rem] mb-4"
            alt="getStart"
          />
          <p className="font-sans text-lg mb-5 text-center text-gray-500">
            Our AI-powered Stress Assistant measures your stress level and
            generates personalized recommendations for you
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-sans text-lg mb-5 text-center w-max">
            Don't let job stress control you - take control today!
          </p>
          <button
            className=" border w-max border-violet-500 bg-violet-500 hover:bg-violet-600 text-white font-bold px-8 py-3 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            // onMouseEnter={() => setShowArrow((prev) => !prev)}
            // onMouseLeave={() => setShowArrow((prev) => !prev)}
            onClick={props.move}
          >
            Start my 1 min Stress Check
            {/* {showArrow && (
              <i className="ml-[0.5rem] arrowIcon">
                <FontAwesomeIcon icon={faArrowRight} />
              </i>
            )} */}
          </button>
        </div>
      </div>
    </div>
  );
};
export default GetStarted;
