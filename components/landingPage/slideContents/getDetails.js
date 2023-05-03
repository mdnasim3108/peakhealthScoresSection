import { Player } from "@lottiefiles/react-lottie-player";
import app from "../../../firebase.config";
import { GoogleAuthProvider, signInWithPopup, getAuth, sendSignInLinkToEmail } from "firebase/auth"
// import { useAuthState } from "react-firebase-hooks/auth"
import processing from "../../../public/processing1.json";
import { useState, useContext, useEffect } from "react";
import voiceContext from "../contextStrore/voiceContext";
// import { Check } from "@mui/icons-material";
// import { data } from "autoprefixer";
import ContentContext from "../contextStrore/contentContext";
import GoogleButton from 'react-google-button'
import dynamic from "next/dynamic";

// import { google } from "googleapis";
// const google = dynamic(() => import(('googleapis')))
const GetDetails = (props) => {
  // const people = google.people('v1');
  // const gapiauth = new google.auth.GoogleAuth({
  //   scopes: [
  //     'https://www.googleapis.com/auth/contacts',
  //     'https://www.googleapis.com/auth/contacts.readonly',
  //     'https://www.googleapis.com/auth/directory.readonly',
  //     'https://www.googleapis.com/auth/user.addresses.read',
  //     'https://www.googleapis.com/auth/user.birthday.read',
  //     'https://www.googleapis.com/auth/user.emails.read',
  //     'https://www.googleapis.com/auth/user.gender.read',
  //     'https://www.googleapis.com/auth/user.organization.read',
  //     'https://www.googleapis.com/auth/user.phonenumbers.read',
  //     'https://www.googleapis.com/auth/userinfo.email',
  //     'https://www.googleapis.com/auth/userinfo.profile',
  //   ],
  // });
  // const initClient=async()=>{
  //   const authClient = await gapiauth.getClient();
  //   google.options({auth: authClient});
  // }
  // useEffect(async()=>{
  //     initClient()
  // },[])
  
  const voiceState = useContext(voiceContext);
  const [yearIsValid, setYearIsValid] = useState(true);
  const [email, setEmail] = useState("")
  // const [value,setValue]=useState("")
  const [infoMsg, setInfoMsg] = useState("")
  const [details, setDetails] = useState({
    username: "",
    email: "",
    gender: "",
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
    if (yearIsValid) {
      props.move()
      voiceState.registerUser({
        username: details.username,
        gender: details.gender,
        year: details.year,
        email: details.email,
      });
      
    }
  };

  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/user.birthday.read")
  provider.addScope("https://www.googleapis.com/auth/user.gender.read")

  const auth = getAuth(app)
 

  const handleClick = () => {
    signInWithPopup(auth, provider).then(async(result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const userId = result.user;
      // const service = google.people({version: 'v1', auth})
      // const res = await service.people.connections.list({
      //   resourceName: 'people/me',
      //   pageSize: 10,
      //   personFields: 'names,emailAddresses',
      // });
      
      // const res1 = await people.people.get({
      //   personFields: 'birthdays,genders',
      //   'requestMask.includeField': 'person.names',
      //   resourceName: 'people/117044242738047874308',
      //   sources: 'placeholder-value',
      // });
      console.log(userId);
    }).catch((error) => console.log(error))

  }

  const emailSubmit = (e) => {
    e.preventDefault();
    sendSignInLinkToEmail(auth, email, {
      url: "https://check.peakhealth.tech/",
      handleCodeInApp: true
    }).then(
      (result) => {
        console.log("Successfull")
        console.log(result)
        setInfoMsg("Please check Your Inbox for authentication")
      }
    ).catch((error) => {
      console.log(error.message)
    })

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
            <h1 className="text-lg text-center text-gray-500">OR</h1>
            <div className="w-full flex items-center justify-center mt-2">
              <GoogleButton
                type="light"
                className="w-full rounded"
                onClick={handleClick}
              />
            </div>
          </form>
          {/* <form onSubmit={emailSubmit}>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-5 focus:border-violet-500 "
              type="email"
              placeholder="Your email"
              required
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Send Email</button>
          </form> */}



        </div>
      </div>
    </>
  );
};
export default GetDetails;
