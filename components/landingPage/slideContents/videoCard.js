import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
const videoCard = (props) => {
  const [cardState, setCardState] = useState({})
  return (
    <div
      className={`rounded flex border shadow-lg relative px-5 py-4  ${props.top ? props.top : ""} hover:bg-violet-300 cursor-pointer w-full hover:text-white hover:scale-[1.02] transition-all duration-200 ease-linear`}
      onMouseEnter={() => setCardState((prev) => {
        return { ...prev, card1: true }
      })}
      onMouseLeave={() => setCardState((prev) => {
        return { ...prev, card1: false }
      })}
      onClick={()=>props.onClick(props.id)}
    >
      <Image
        src={props.thumbnail}
        width={100}
        height={100}
        className=" sm:w-[22%] mr-[3%] h-[7rem]  inline object-cover rounded-lg"
        alt="getStart"
      />
      <div className=' w-[25%]   text-left pl-3'>
        <h1 className='font-bold text-lg'>{props.description}</h1>
        <div className='flex mt-3'>
            <Image
              src={props.authImg}
              width={100}
              height={100}
              className='rounded-full border-2 bg-gray-300 w-[3rem] h-[3rem] mr-3'
            />
          <p className={`${!cardState.card1 ? "text-gray-600" : "text-white"}`}>{props.channelTitle}</p>
        </div>
      </div>

      <div className='w-[20%]   text-center'>
        <h1 className='font-bold text-[1.23rem]'>{props.category}</h1>
      </div>

      <div className={` w-[20%] rounded-xl h-max  ${props.color} text-center text-white`}>
        <h1 className='font-bold  text-xl text-center'>{props.type}</h1>
      </div>

      <div className='w-[10%]  text-center'>
        <h1 className='font-bold text-xl'>{props.duration}</h1>
      </div>

    </div>
  )
}
export default videoCard;
