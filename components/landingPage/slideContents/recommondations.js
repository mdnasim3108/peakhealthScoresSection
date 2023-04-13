import thumbnailImg from "../../../public/maxresdefault.jpg";
import axios from 'axios';
import YoutubeComp from './youtube';
import VideoCard from "./videoCard";
import SkeletonLoader from "./skeletonLoader";
import { useContext } from "react";
import voiceContext from "../contextStrore/voiceContext";
const recommendations = () => {
  const voiceState = useContext(voiceContext);

  return (

    <div className="relative bottom-[5%]">

      <h1 className="text-xl text-center font-[500]">For your current stress level, here are few things you can do…</h1>

      <div className="flex w-full  p-5  text-gray-500">
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

      {voiceState.voiceFeatures.videos ? <div>

        {voiceState.voiceFeatures.videoData.map((el) => {
          return <VideoCard {...el} />
        })}

      </div> :

        <div className="ml-5">
          <SkeletonLoader />
          <SkeletonLoader top="top-3" />
          <SkeletonLoader top="top-5" />
        </div>
      }
    </div>
  );
};
export default recommendations;
