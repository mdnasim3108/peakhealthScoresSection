import YouTube, { YouTubeProps } from 'react-youtube';
const YoutubeComp=(props)=>{
    const onPlayerReady=(event)=>{
        event.target.pauseVideo();
    }
    const opts = {
        height: '500',
        width: '800',
        playerVars: {
          autoplay: 1,
        },
      };
    return <>
            <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={onPlayerReady} />
    </>
}
export default YoutubeComp;