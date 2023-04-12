import thumbnailImg from "../../../public/maxresdefault.jpg";
import axios from 'axios';
import YoutubeComp from './youtube';
import VideoCard from "./videoCard";
const recommendations = () => {
  const videosData = [
    {
      authImg: thumbnailImg,
      description: "How to reduce stress with 2:1 breathing technique",
      location: "Tufts Medical Center",
      designation: "Healthcare Expert",
      color: "bg-blue-500",
      type: "Breathing Excercise",
      duration: "4:17",
    },
    {
      authImg: thumbnailImg,
      description: "How to reduce stress with 2:1 breathing technique",
      location: "Tufts Medical Center",
      designation: "Healthcare Expert",
      color: "bg-blue-500",
      type: "Breathing Excercise",
      duration: "4:17",
      top:"top-3"
    },
    {
      authImg: thumbnailImg,
      description: "How to reduce stress with 2:1 breathing technique",
      location: "Tufts Medical Center",
      designation: "Healthcare Expert",
      color: "bg-blue-500",
      type: "Breathing Excercise",
      duration: "4:17",
      top:"top-5"
    },
  ]
  return (
    <div className="relative bottom-[5%]">
      <h1 className="text-xl text-center font-[500]">For your current stress level, here are few things you can do…</h1>
      
      <div>

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

         {videosData.map((el)=>{
           return <VideoCard {...el} />
         })}
      </div>
      {/* <div className='flex items-center justify-center w-full h-full'>
        <YoutubeComp />
      </div> */}

    </div>
  );
};
export default recommendations;
