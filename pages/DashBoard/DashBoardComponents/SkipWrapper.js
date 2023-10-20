import logoImg from "../../../public/phLogo.png"
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faBell, faUser, faCaretDown,faArrowRight } from "@fortawesome/free-solid-svg-icons";
const skipWrapper = (props) => {
    return <div>

        <div className="h-[7vh] w-full bg-white shadow-lg border-b-2 z-10 pr-10 flex justify-between">

            <div className="flex items-center px-10 bg-gray-100">
                <Image
                    src={logoImg}    
                    className="w-[35px] h-[35px]"
                />


                <span className="text-[25px] mr-1  text-[#ea7f17] font-bold font-rajdhani">
                    Stress
                </span>
                <span className="text-[25px] mr-1  text-[#4855dc] font-bold font-rajdhani">
                    Sense
                </span>
                <span className="text-[25px]  mr-1  text-[#4855dc] font-bold font-rajdhani">
                    AI
                </span>
            </div>

            <div className="flex justify-between items-center w-[8%]">

                <div className="w-[20px] cursor-pointer">
                    <FontAwesomeIcon icon={faCircleQuestion} className="text-gray-300" />

                </div>

                <div className="w-[20px] cursor-pointer">
                    <FontAwesomeIcon icon={faBell} className="text-gray-300" />

                </div>

                <div className="w-[20px] cursor-pointer">
                    <FontAwesomeIcon icon={faUser} className="text-gray-300" />

                </div>

                <div className="w-[12px] relative right-3 cursor-pointer">
                    <FontAwesomeIcon icon={faCaretDown} className="text-gray-300" />
                </div>

            </div>


        </div>

        <div className={`${props.bottom?"h-[86vh]":"h-[93vh]"} w-full bg-gray-100 flex`}>

            {props.children}

        </div>

        {props.bottom && <div className="h-[7vh] w-full flex justify-between bg-white shadow-lg border-t-2 z-10 pr-[6rem] pl-[20rem] items-center">
            
            <p className="text-[16px] text-[#9095A1FF] cursor-pointer" onClick={props.click}>Skip</p>
            <button className={`${props.disabled?"text-gray-600 bg-gray-200 ":"bg-[#3F4FDBFF] text-white "} rounded text-[16px] border px-[16px] py-1 transition-all duration-300 ease-linear`}
            onClick={props.click}
            disabled={props.disabled}
            >
                    Next
                    <FontAwesomeIcon icon={faArrowRight} className={`${props.disabled?"text-gray-600":"text-white"} w-[0.5rem] ml-1  inline-block`}/>
            </button>
        </div>}

    </div>
}
export default skipWrapper;