import YouTube, { YouTubeProps } from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faThumbsDown,faHeart,faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useRef, useState,useContext } from 'react';
import { BsEmojiHeartEyes, BsEmojiHeartEyesFill } from 'react-icons/bs'
import Bulb from '../UI/FASolid/bulb';
import Heart from '../UI/FASolid/heart';
import ThumbsUp from '../UI/FASolid/thumbsUp';
import ThumbsDown from '../UI/FASolid/thumbsDown';
import axios from 'axios';
import voiceContext from '../contextStrore/voiceContext';
const YoutubeComp = (props) => {
  const playerRef = useRef(null);
  const voiceState=useContext(voiceContext)
  const [activeIcons, setActiveIcons] = useState({ thumbsUp: false, light: false, thumbsDown: false, heart: false })
  const apiCall=async()=>{
   await axios.post("/api/updateVideosData",{vId:props.id,objId:voiceState.voiceFeatures.objId,icons:activeIcons})
  }
  useEffect(()=>{
      apiCall();
  },[activeIcons])
  const onReady = (event) => {
    playerRef.current = event.target;
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setOption('rel', 0);
      playerRef.current.setOption('showinfo', 0);
    }
  }, [playerRef]);
  const opts = {
    height: '400',
    width: '700',
    playerVars: {
      autoplay: 1,
      controls: 1,
      showRelatedVideos: false,
      showVideoAnnotations: false,
      origin: "http://localhost:3000",
      rel:0,
    },
  };
  return (
    <div className=' flex flex-col items-center justify-center lg:p-10'>

      <div className=''>
        <YouTube videoId={props.id} opts={opts} onReady={onReady} />
      </div>

<<<<<<< HEAD
      <div className='flex justify-center'>
        <button id="back" className="border rounded-full mr-4 text-center border-violet-500 bg-violet-500 hover:bg-violet-600 text-white font-bold uppercase mt-5  py-3 px-5 outline-none focus:outline-none ease-linear transition-all duration-150"
=======
      <div className='flex flex-col-reverse justify-center'>
        <button className="border text-lg  rounded-full text-center border-violet-500 bg-violet-500 hover:bg-violet-600 text-white font-bold  mt-3  py-3 px-5 outline-none focus:outline-none ease-linear transition-all duration-150"
>>>>>>> 5f432fec0d6a1ad7064b85999aebd377fc1f4347
          onClick={()=>{
            props.back()
            console.log(activeIcons)
          }}
        >
          <FontAwesomeIcon  icon={faArrowLeft} className='text-white mr-4' />
          Back
        </button>


<<<<<<< HEAD
        <div  className=' px-4 border shadow-lg h-[3.1rem] mt-5 flex items-center rounded-full '>
=======
        <div className='  px-4 border shadow-lg h-[3.1rem] mt-2 flex items-center rounded-full '>
>>>>>>> 5f432fec0d6a1ad7064b85999aebd377fc1f4347

          {!activeIcons.thumbsUp ? <FontAwesomeIcon id="icon"
            onClick={() => setActiveIcons((prev) => {
              return { ...prev, thumbsUp: true }
            })}
            icon={faThumbsUp}
            className='text-violet-500 mymodal hover:text-violet-600 text-2xl mr-4 cursor-pointer' /> :
            <ThumbsUp id="icon" onClick={() => setActiveIcons((prev) => {
              return { ...prev, thumbsUp: false }
            })} />
          }

<<<<<<< HEAD
          {!activeIcons.laugh ? <FontAwesomeIcon id="icon"
            icon={faFaceLaughSquint}
=======
          {!activeIcons.light ? <FontAwesomeIcon
            icon={faLightbulb}
>>>>>>> 5f432fec0d6a1ad7064b85999aebd377fc1f4347
            onClick={() => setActiveIcons((prev) => {
              return { ...prev, light: true }
            })}
            className='text-violet-500 mymodal text-2xl hover:text-violet-600 mr-4 cursor-pointer' /> :
<<<<<<< HEAD
            <Laugh id="icon" onClick={() => setActiveIcons((prev) => {
              return { ...prev, laugh: false }
            })} />
          }

          {!activeIcons.heart ? <BsEmojiHeartEyes id="icon"
=======
            <Bulb onClick={() => setActiveIcons((prev) => {
              return { ...prev, light: false }
            })} />
          }

          {!activeIcons.heart ? <FontAwesomeIcon
          icon={faHeart}
>>>>>>> 5f432fec0d6a1ad7064b85999aebd377fc1f4347
            onClick={() => setActiveIcons((prev) => {
              return { ...prev, heart: true }
            })}
            className="text-violet-500 mymodal text-2xl hover:text-violet-600 mr-4 cursor-pointer"
          />
<<<<<<< HEAD
            : <BsEmojiHeartEyesFill id="icon"
=======
            : <Heart
>>>>>>> 5f432fec0d6a1ad7064b85999aebd377fc1f4347
              onClick={() => setActiveIcons((prev) => {
                return { ...prev, heart: false }
              })}
              className="text-violet-500 mymodal hover:text-violet-600 text-2xl mr-4 cursor-pointer" />
          }

          {!activeIcons.thumbsDown ? <FontAwesomeIcon id="icon"
            onClick={() => setActiveIcons((prev) => {
              return { ...prev, thumbsDown: true }
            })}
            icon={faThumbsDown}
            className='text-violet-500 mymodal hover:text-violet-600 text-2xl cursor-pointer' />
            : <ThumbsDown id="icon" onClick={() => setActiveIcons((prev) => {
              return { ...prev, thumbsDown: false }
            })} />
          }

        </div>
      </div>




    </div>


  )
}
export default YoutubeComp;