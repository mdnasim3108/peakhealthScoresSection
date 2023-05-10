import YouTube, { YouTubeProps } from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faThumbsDown, faHeart, faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useRef, useState, useContext,useCallback } from 'react';
import { BsEmojiHeartEyes, BsEmojiHeartEyesFill } from 'react-icons/bs'
import Bulb from '../UI/FASolid/bulb';
import Heart from '../UI/FASolid/heart';
import ThumbsUp from '../UI/FASolid/thumbsUp';
import ThumbsDown from '../UI/FASolid/thumbsDown';
import axios from 'axios';
import voiceContext from '../contextStrore/voiceContext';
const YoutubeComp = (props) => {
    const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)  
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeListener(updateTarget);
    }, []);

    return targetReached;
  };
  const isBreakpoint = useMediaQuery(600);
  const playerRef = useRef(null);
  const voiceState = useContext(voiceContext)
  const [showText, setShowText] = useState({})
  const [activeIcons, setActiveIcons] = useState({ thumbsUp: false, light: false, thumbsDown: false, heart: false })
  const apiCall = async () => {
    await axios.post("/api/updateVideosData", { vId: props.id, objId: voiceState.voiceFeatures.objId, icons: activeIcons })
  }
  useEffect(() => {
    apiCall();
  }, [activeIcons])
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
    height: isBreakpoint?'160':'400',
    width: isBreakpoint?'300':'700',
    playerVars: {
      autoplay: 1,
      controls: 1,
      showRelatedVideos: false,
      showVideoAnnotations: false,
      origin: "http://localhost:3000",
      rel: 0,
    },
  };
  return (
    <div className=' flex flex-col items-center justify-center lg:p-10'>

        
        <YouTube className='' videoId={props.id} opts={opts} onReady={onReady} />
    

      <div className='flex flex-col  justify-center'>

        <div className='sm:flex hidden justify-between  relative top-[0.7rem] h-0'>
          {showText.great && !activeIcons.thumbsUp && <p className='text-[0.7rem] popText relative left-4  text-gray-600  text-center bottom-1'>Like</p>}
          {showText.interesting && !activeIcons.light && <p className='text-[0.7rem] popText relative left-[2.8rem]  text-gray-500 text-center bottom-1'>interesting</p>}
          {showText.like && !activeIcons.heart && <p className='text-[0.7rem] popText relative left-[5.8rem]  text-gray-500 text-center bottom-1'>lovely</p>}
          {showText.dislike && !activeIcons.thumbsDown && <p className='text-[0.7rem] popText relative left-[8rem]  text-gray-500 text-center bottom-1'>dislike</p>}
        </div>

        <div className='  px-4 relative border shadow-lg h-[3.6rem] mt-2 flex items-center rounded-full '>

          {!activeIcons.thumbsUp ?


            <FontAwesomeIcon id="icon"
              onClick={() => setActiveIcons((prev) => {
                return { ...prev, thumbsUp: true, }
              })}
              icon={faThumbsUp}
              onMouseEnter={() => setShowText({ great: true })}
              onMouseLeave={() => setShowText({ great: false })}
              className='text-violet-500  mymodal hover:text-violet-600 text-2xl mr-4 cursor-pointer' />

            :
            <ThumbsUp id="icon" onClick={() => setActiveIcons((prev) => {
              return { ...prev, thumbsUp: false }
            })} />
          }



          {!activeIcons.light ? <FontAwesomeIcon
            icon={faLightbulb}
            onClick={() => setActiveIcons((prev) => {
              return { ...prev, light: true }
            })}
            className='text-violet-500 mymodal text-2xl hover:text-violet-600 mr-4 cursor-pointer'
            onMouseEnter={() => setShowText({ interesting: true })}
            onMouseLeave={() => setShowText({ interesting: false })}
          /> :
            <Bulb onClick={() => setActiveIcons((prev) => {
              return { ...prev, light: false }
            })} />
          }

          {!activeIcons.heart ? <FontAwesomeIcon
            icon={faHeart}
            onClick={() => setActiveIcons((prev) => {
              return { ...prev, heart: true }
            })}
            onMouseEnter={() => setShowText({ like: true })}
            onMouseLeave={() => setShowText({ like: false })}
            className="text-violet-500 mymodal text-2xl hover:text-violet-600 mr-4 cursor-pointer"
          />
            : <Heart
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
            className='text-violet-500 mymodal hover:text-violet-600 text-2xl cursor-pointer'
            onMouseEnter={() => setShowText({ dislike: true })}
            onMouseLeave={() => setShowText({ dislike: false })}
          />
            : <ThumbsDown id="icon" onClick={() => setActiveIcons((prev) => {
              return { ...prev, thumbsDown: false }
            })} />
          }

        </div>
        <button className="border text-lg  rounded-full text-center border-violet-500 bg-violet-500 hover:bg-violet-600 text-white font-bold  mt-3  py-3 px-5 outline-none focus:outline-none ease-linear transition-all duration-150"
          onClick={() => {
            props.back()
            console.log(activeIcons)
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className='text-white mr-4' />
          Back
        </button>
      </div>




    </div>


  )
}
export default YoutubeComp;