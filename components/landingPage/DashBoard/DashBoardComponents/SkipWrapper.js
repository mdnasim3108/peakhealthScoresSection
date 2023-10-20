import logoImg from "../../../../public/phLogo.png"
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faBell, faUser, faCaretDown,faArrowRight } from "@fortawesome/free-solid-svg-icons";
const skipWrapper = (props) => {
    return <div className="w-full">

        <div className="lg:h-[7vh] w-full bg-white shadow-lg border-b-2 z-10 lg:pr-10 pr-3 flex justify-between">

            <div className="flex items-center lg:px-10 pl-3">
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

            {/* <div className="flex justify-between items-center lg:w-[8%] w-[22%]">

                    <FontAwesomeIcon icon={faCircleQuestion} className="text-gray-300 w-[14px]" />


                    <FontAwesomeIcon icon={faBell} className="text-gray-300 w-[14px]" />


                    <FontAwesomeIcon icon={faUser} className="text-gray-300 w-[14px]" />


                    <FontAwesomeIcon icon={faCaretDown} className="text-gray-300 w-[14px]" />

            </div> */}


        </div>

        <div className={`lg:h-[86vh] w-full bg-gray-100 flex lg:flex-row flex-col items-center lg:items-stretch justify-between`}>

            {props.children}

        </div>

        <div className="lg:h-[7vh] w-full flex justify-between bg-white shadow-lg border-t-2 z-10 lg:pr-[6rem] lg:pl-[20rem] pl-5 pr-5 lg:py-0 py-3 items-center">
            
            <p className="text-[16px] text-[#9095A1FF] cursor-pointer" onClick={props.click}>Skip</p>
            <button className={`${props.disabled?"text-gray-600 bg-gray-200 ":"bg-[#3F4FDBFF] text-white "} rounded text-[16px] border px-[16px] py-1 transition-all duration-300 ease-linear`}
            onClick={props.click}
            disabled={props.disabled}
            >
                    {props.next}
                    <FontAwesomeIcon icon={faArrowRight} className={`${props.disabled?"text-gray-600":"text-white"} lg:w-[1rem] w-[12px] ml-1  inline-block`}/>
            </button>
        </div>

    </div>
}
export default skipWrapper;