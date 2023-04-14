import YouTube, { YouTubeProps } from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const YoutubeComp = (props) => {
  const opts = {
    height: '500',
    width: '800',
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <>
      <FontAwesomeIcon icon={faArrowLeft} onClick={props.back} className='cursor-pointer' />
      <div className='flex items-center justify-center'>
        <YouTube videoId={props.id} opts={opts} />
      </div>
    </>


  )
}
export default YoutubeComp;