import { Player } from "@lottiefiles/react-lottie-player"
import errorLot from "../../../public/errorLot.json";
import { useContext } from "react";
import ContentContext from "../contextStrore/contentContext";
import voiceContext from "../contextStrore/voiceContext";
const modal = (props) => {
    const content = useContext(ContentContext)
    const voiceState=useContext(voiceContext)
    const Backdrop = () => {
        return (
            <div className=" w-screen absolute h-[100vh] bg-black/75 z-20"></div>
        )
    }
    const OverLay = (props) => {
        return (
            <div className="mymodal top-[20vh]  w-[40rem] max-w-[90%] bg-white rounded shadow-lg z-30">
                <div className="h-[50%] flex justify-center items-center bg-red-400 w-full pb-5">
                    <Player
                        autoplay
                        loop
                        src={errorLot}
                        className="w-[150px] h-[150px]"
                    ></Player>
                </div>
                <div className="text-center p-10">
                    <h1 className="text-2xl font-sans mb-5">{props.head}</h1>
                    <p className="text-gray-400 text-lg mb-5">{props.message}</p> 
                    <button
                    className="rounded-full p-2 px-5  text-white bg-violet-400 hover:bg-violet-600 transition-all ease-linear duration-200"
                    onClick={()=>{
                        content.resetContent(props.content)
                        voiceState.reset()
                    }}
                    >
                        {props.btnLabel}</button>
                </div>
            </div>
        )
    }
    return (
        <>
            <Backdrop />
            <OverLay {...props} />
        </>

    )

}
export default modal;

