import Image from 'next/image';
import { useState } from 'react';
const videoCard=(props)=>{
    const [cardState, setCardState] = useState({})
    return (
        <div 
        className={ `rounded flex border shadow-lg relative p-5 ${props.top?props.top:""} hover:bg-violet-500 cursor-pointer w-full hover:text-white hover:scale-[1.02] transition-all duration-200 ease-linear` }
        onMouseEnter={()=>setCardState((prev)=>{
          return {...prev,card1:true}
        })}
        onMouseLeave={()=>setCardState((prev)=>{
          return {...prev,card1:false}
        })}
        >
          <Image
            src={props.authImg}
            className=" sm:w-[25%]  inline rounded-lg"
            alt="getStart"
          />
          <div className=' w-[25%]   text-left pl-3'>
            <h1 className='font-bold text-lg'>{props.description}</h1>
            <div className='flex mt-3'>
              <div className='rounded-full bg-gray-300 w-10 h-10 mr-3' />
              <p className={`${!cardState.card1?"text-gray-600":"text-white"}`}>{props.location}</p>
            </div>
          </div>

          <div className='w-[20%]   text-center'>
            <h1 className='font-bold text-lg'>{props.designation}</h1>
          </div>

          <div className={` w-[20%] rounded-xl h-8  ${props.color} text-center text-white`}>
            <h1 className='font-bold text-lg  text-center'>{props.type}</h1>
          </div>

          <div className='w-[10%]  text-center'>
              <h1 className='font-bold text-sm'>{props.duration}</h1>
          </div>

        </div>
    )
}
export default videoCard;