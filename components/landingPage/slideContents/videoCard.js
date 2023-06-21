import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
const videoCard = (props) => {
  const [cardState, setCardState] = useState({})
  return (
    <div id="youtube-video"
      className={`rounded sm:flex sm:flex-row flex-col border shadow-lg relative px-5 py-4  ${props.top ? props.top : ""} sm:hover:bg-violet-300 cursor-pointer w-full sm:hover:text-white sm:hover:scale-[1.02] transition-all duration-200 ease-linear`}
      onMouseEnter={() => setCardState((prev) => {
        return { ...prev, card1: true }
      })}
      onMouseLeave={() => setCardState((prev) => {
        return { ...prev, card1: false }
      })}
      onClick={() => props.onClick(props.id)}
    >
      <Image
        src={props.thumbnail}
        // src="https://i.ytimg.com/vi/t1rRo6cgM_E/hqdefault.jpg"
        width={400}
        height={400}
        className=" sm:w-[22%] w-full mr-[3%] sm:h-[7rem] h-[11rem]  inline object-cover rounded-lg"
        alt="getStart"
      />
      <div className='sm:w-[27%]   text-left pl-3'>
        <div className=' leading-[1.5em] sm:h-[3em] overflow-hidden text-ellipsis'>
          <h1 className='font-bold 2xl:text-[1.1rem] sm:mt-0  mt-3 tracking-tight text-left xl:text-[1rem] lg:text-[0.9rem] sm:text-ellipsis'>{props.description.length >= 50 ? props.description.slice(0, 51) + "..." : props.description}</h1>
        </div>
        <div className='flex sm:items-start justify-between sm:justify-start items-center  mt-3'>
          <div className='flex items-center'>
            <Image
              src={props.authImg}
              width={100}
              height={100}
              className='rounded-full border-2 bg-gray-300 w-[3rem] h-[3rem] mr-3'
            />
            <p className={`${!cardState.card1 ? "text-gray-600" : "text-white"}`}>{props.channelTitle}</p>
          </div>
          <div className='sm:w-[18%] block sm:hidden  text-center'>
            <h1 className='text-lg'>{props.category}</h1>
          </div>
        </div>
      </div>

      <div className='sm:w-[18%]   sm:block hidden  text-center'>
        <h1 className='text-lg'>{props.category}</h1>
      </div>

      <div className='w-full sm:w-[20%] flex justify-between'>
        <div className={` sm:w-full rounded-xl h-max px-2 sm:m-0 mt-3 ml-3   ${props.color} text-center text-white`}>
          <h1 className='  text-lg text-center'>{props.type}</h1>
        </div>
        <div className='sm:hidden visible mt-2   text-center'>
          <h1 className='text-lg'>{props.duration}</h1>
        </div>
      </div>

      <div className='sm:w-[10%] sm:visible invisible  text-center'>
        <h1 className='text-lg'>{props.duration}</h1>
      </div>

    </div>
  )
}
export default videoCard;
