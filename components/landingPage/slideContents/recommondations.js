import thumbnailImg from "../../../public/maxresdefault.jpg";
import axios from 'axios';
import YoutubeComp from './youtube';
import VideoCard from "./videoCard";
import SkeletonLoader from "./skeletonLoader";
import { useContext, useState } from "react";
import voiceContext from "../contextStrore/voiceContext";
import ContentContext from "../contextStrore/contentContext";
const recommendations = (props) => {
  const voiceState = useContext(voiceContext);
  const content = useContext(ContentContext)
  const [video, setVideo] = useState({ play: false, id: "" })
  const [showSignUp, setShowSignUp] = useState(true)
  return (
    !video.play ? <div className="relative sm:bottom-7">

      <h1 className="sm:text-3xl sm:m-0 mb-4 text-xl text-center font-[500]">For your current stress level, here are few things you can do…</h1>

      <div className="sm:flex w-full hidden  p-5  text-gray-500">
        <div
          className=" sm:w-[25%]"
        />
        <div className='w-[25%] text-center '>
          <h1 className=" text-lg font-sans ">DESCRIPTION</h1>
        </div>

        <div className='w-[20%]   text-center'>
          <h1 className=" text-lg font-sans ">SPEAKER</h1>
        </div>

        <div className=' w-[20%]  text-center'>
          <h1 className="text-lg font-sans ">ACTION TYPE</h1>
        </div>

        <div className='w-[10%] text-center'>
          <h1 className="text-lg font-sans text-center">TIME</h1>
        </div>

      </div>

      {voiceState.voiceFeatures.videos ? <div className="">

        {voiceState.voiceFeatures.videoData.map((el) => {
          if (voiceState.voiceFeatures.videoData.indexOf(el) === 1) return <VideoCard
            {...el} top="top-3" onClick={(id) => setVideo({ play: true, id })}
          />
          if (voiceState.voiceFeatures.videoData.indexOf(el) === 2) return <VideoCard
            {...el} top="top-5" onClick={(id) => setVideo({ play: true, id })}
          />
          return <VideoCard {...el} onClick={(id) => setVideo({ play: true, id })} />
        })}
      </div> :

        <div className="ml-5">
          <SkeletonLoader />
          <SkeletonLoader top="top-3" />
          <SkeletonLoader top="top-5" />
        </div>
      }
      {
        content.showSignUp
        &&
        <div className="w-full flex items-center justify-center">
          <button
            id="stressCheck"
            className="border border-violet-500 bg-violet-500 hover:bg-violet-600 text-white font-bold relative top-[2rem] w-[30%] py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
            onClick={() => {
              props.onclick()
              setShowSignUp(false)
            }}
          >
            Sign Up
          </button>
        </div>

      }
    </div>
      : <YoutubeComp id={video.play && video.id} back={() => setVideo({ play: false, id: "" })} />
  )
};
export default recommendations;
