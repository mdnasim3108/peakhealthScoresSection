import Image from "next/image"
import heroImg from "../../../public/botHero.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
const botMessage = (props) => {
    return <div className={"flex items-center lg:w-[409px] w-[309px] bot " +props.class}>

        <Image src={heroImg} className="w-[69px] h-[69px] rounded- rotate-[10deg]" />

        <div className="w-[12px] relative left-[4px]">
            <FontAwesomeIcon icon={faCaretDown} className="text-white rotate-90" />
        </div>

        <div className="w-[316px]  bg-white flex justify-between shadow-lg">

            <div className="py-[25px] pl-[1rem] h-full">
                {props.head && <h1 className="text-[#171A1FFF] text-[20px] font-semibold mb-3">{props.head}</h1>}
                <p className={`${props.head?"text-[16px] font-sansSerif":"text-[20px]"} text-[#565D6DFF]`}>{props.message}</p>
            </div>

            <div className="w-[6px] rounded-tl-full rounded-bl-full bg-[#4069E5FF] ">

            </div>

        </div>

    </div>
}
export default botMessage