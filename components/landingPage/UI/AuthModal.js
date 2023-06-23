import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { Fragment } from "react"
import authContext from "../contextStrore/authContext"
import { useContext } from "react"

const authModal = (props) => {
    
    const authState=useContext(authContext)
    const Backdrop = () => {
        return (
            <div className=" w-screen absolute sm:h-[100vh] h-[400vh] bg-black/75 z-20"
                 onClick={()=>authState.close()}
            ></div> 
        )
    }
    const OverLay = (props) => {
        return (
            <div className={`authModal ${authState.signUp?"top-[30vh]":"top-[5vh]"}  sm:top-0 relative   sm:pb-10 p-4 sm:px-0 sm:pt-0  w-[70rem] max-w-[90%] bg-white rounded shadow-lg z-30`}>
                <div className="w-full cursor-pointer flex justify-end ">
                    <div
                     className="rounded-full w-[25px] h-[25px] bg-red-500 pl-[0.3rem] cursor-pointer transition-all duration-100 ease-linear relative sm:left-3 sm:bottom-3 left-5 bottom-5"
                     onClick={()=>authState.close()}
                     >
                        <FontAwesomeIcon icon={faClose} className="w-[1rem] h-[1rem]  text-white  transition-all duration-100 ease-linear" />
                    </div>
                </div>
                {props.comp}
            </div>
        )
    }
    return (
        <Fragment>
            
            <Backdrop />
            <OverLay {...props} />
        </Fragment>
    )
}
export default authModal;