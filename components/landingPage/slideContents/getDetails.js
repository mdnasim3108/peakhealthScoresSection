import { Player } from "@lottiefiles/react-lottie-player";
import app from "../../../firebase.config";
import {GoogleAuthProvider,signInWithPopup,getAuth} from "firebase/auth"
import processing from "../../../public/processing1.json";
import { useState, useContext,useEffect } from "react";
import voiceContext from "../contextStrore/voiceContext";
import { CircularProgress, circularProgressClasses } from "@mui/material";
import { Check } from "@mui/icons-material";
import { data } from "autoprefixer";
// import Axios from "axios";    
const GetDetails = (props) => {
  const voiceState = useContext(voiceContext);
  const [yearIsValid, setYearIsValid] = useState(true);
  const [details, setDetails] = useState({
    username: "",
    email: "",
    gender: "",
    year: "",
  });
  const changeHandler = (e) => {
    navigator.u
    setDetails((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  useEffect(()=>{
      if(voiceState.voiceFeatures.registered){
        setTimeout(()=>props.move(),1000)
      }
  },[voiceState.voiceFeatures.registered])
  const getSubmitHandler = async (e) => {
    e.preventDefault();
    if(yearIsValid){
    voiceState.registerUser({
      username: details.username,
      gender: details.gender,
      year: details.year,
      email: details.email, 
    });
  }
  };

// signin with google
const auth = getAuth(app)
const provider = new GoogleAuthProvider();


const handleClick = () =>{
  
  signInWithPopup(auth,provider).then((result) => {
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const userId = result.user.uid;
  console.log(userId)
}).catch((error)=>console.log(error))
 
}


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
        <div className="">
          <form className="mt-10" onSubmit={getSubmitHandler}>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-5 focus:border-violet-500 "
              id="username"
              type="text"
              placeholder="Your Name"
              onChange={changeHandler}
              required={true}
            />
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-5 focus:border-violet-500"
              id="email"
              type="email"
              placeholder="Your Email"
              onChange={changeHandler}
              required={true}
            />
            <select
              id="gender"
              class=" border  bg-white text-gray-400 text-[17px] shadow focus:outline-none  rounded  focus:border-violet-500 block w-full py-1 px-3 mb-5"
              required={true}
              onChange={changeHandler}
            >
              <option selected disabled hidden value="">
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              className={`yearInput shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-5 ${
                yearIsValid ? "focus:border-violet-500" : "focus:border-red-500"
              } `}
              id="year"
              type="number"
              onChange={(event) => {
                changeHandler(event);
                setYearIsValid(event.target.value.length === 4 && new Date().getFullYear()-(+event.target.value)>16);
              }}
              placeholder="Year of birth"
              required={true}
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
              {
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
              style={{color:"white"}}
            />}
              {voiceState.voiceFeatures.registered && <Check className="text-xl relative bottom-[2px] sm:left-[15%] left-[10%]"/>}
            </button>
          </form>
          <button onClick={handleClick}>SignIn with Google</button>
        </div>
      </div>
    </>
  );
};
export default GetDetails;
