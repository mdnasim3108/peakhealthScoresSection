import { Player } from "@lottiefiles/react-lottie-player";
import processing from "../../../public/processing1.json";
import { useState, useContext, useRef } from "react";
import voiceContext from "../contextStrore/voiceContext";
import ContentContext from "../contextStrore/contentContext";
import generateRandomEmail from "@/utils/randomEmail";

const GetDetails = (props) => {
  const voiceState = useContext(voiceContext);
  const [showText,setShowText]=useState(false)
  const [yearIsValid, setYearIsValid] = useState(true);
  const [details, setDetails] = useState({
    gender: null,
    year: "",
  });
  const content = useContext(ContentContext)
  const changeHandler = (e) => {
    setDetails((prev) => {

      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  const getSubmitHandler = async (e) => {
    e.preventDefault();
    
    if(!details.gender){
      setShowText(true)
      return
    } 

    if (yearIsValid && details.gender) {
      const randomEmail = generateRandomEmail()
      props.move()
      voiceState.registerUser({
        gender: details.gender,
        year: details.year,
        email: randomEmail
      });

    }
  };











  return (
    <>
      <h1 className="sm:text-3xl text-xl  text-center font-bold font-sans relative top-5">
        Your details for AI to measure your stress level accurately
      </h1>
      <div className="flex md:flex-row flex-col-reverse md:mt-20 mt-5 justify-around w-full">
        <div className="flex flex-col justify-center items-center ">
          <div className="ml-10 mt-5 md:m-0">
            <Player
              autoplay
              loop
              src={processing}
              className="sm:w-[20rem] sm:h-[20rem] w-[15rem] h-[15rem] relative bottom-5 sm:left-5"
            ></Player>
          </div>
          <p className="text-sm sm:w-[20rem] text-gray-500 text-center">
            Your information will be kept confidential and used only to measure
            your stress level and personalize your stress relief
            recommendations. Let's begin!
          </p>

        </div>
        <div className="md:w-[50%]">
          <form className="mt-10" onSubmit={getSubmitHandler}>
            <div className="w-full flex justify-between mb-4">

              <div
               className="flex  items-center  border py-2 px-4  bg-white text-gray-400 text-[17px] shadow focus:outline-none   rounded  focus:border-violet-500 w-[49%]"
               >
                <input id="bordered-radio-1" type="radio" value="male" name="bordered-radio"
                  className="mr-2 cursor-pointer h-[1.05rem] w-[1.05rem]"
                  onFocus={(e)=>setDetails((prev)=>{ return {...prev,gender:e.target.value} })}    
                />
                <label for="bordered-radio-1" className="cursor-pointer">Male</label>
              </div>

              <div class="flex items-center  py-2 px-4 border  bg-white text-gray-400 text-[17px] shadow focus:outline-none   rounded  focus:border-violet-500 w-[49%]"
              >
                <input id="bordered-radio-2" type="radio" value="female" name="bordered-radio"
                  
                  className="mr-2 cursor-pointer h-[1.05rem] w-[1.05rem]"
                  onFocus={(e)=>setDetails((prev)=>{ return {...prev,gender:e.target.value} })}    
                />
                <label for="bordered-radio-2" className="cursor-pointer">Female</label>  
              </div>

            </div>

            {showText && (
              <p className="text-sm text-red-300 relative bottom-3 font-sans text-left">
                Select any one of the above fields
              </p>
            )}

            <input
              className={`yearInput shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-5 ${yearIsValid ? "focus:border-violet-500" : "focus:border-red-500"
                } `}
              id="year"
              type="text"
              onChange={(event) => {
                changeHandler(event);
                setYearIsValid(event.target.value.length === 4 && new Date().getFullYear() - (+event.target.value) > 16 && new Date().getFullYear() - (+event.target.value) < 100);
              }}
              placeholder="Year of birth"
              required={true}
              maxLength="4"
            />

            {!yearIsValid && (
              <p className="text-sm text-red-300 relative bottom-5 font-sans text-left">
                Enter a valid year and you should be atleast 16 years old.
              </p>
            )}
            <button
              id="stressCheck"
              className="border border-violet-500 bg-violet-500 hover:bg-violet-600 text-white font-bold  mt-5 w-full py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Check My Stress
              {/* {
                voiceState.voiceFeatures.registering &&
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  sx={{
                    animationDuration: '550ms',
                    [`& .${circularProgressClasses.circle}`]: {
                      strokeLinecap: 'round',
                    },
                  }}
                  size={20}
                  thickness={4}
                  className="relative sm:left-[15%] left-[10%] top-[2px] "
                  style={{ color: "white" }}
                />} */}
            </button>
            
          </form>
        



        </div>
      </div>
    </>
  );
}
export default GetDetails;
