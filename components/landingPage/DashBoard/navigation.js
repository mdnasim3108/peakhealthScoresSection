import BotMessage from "./BotMessage"
import Image from "next/image"
import checkStressLogo from "../../../public/checkStressLogo.jpg"
import challengesImg from "../../../public/challengeImg.jpg"
import skillsImg from "../../../public/skillsImg.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import homeContext from "@/components/landingPage/contextStrore/homeContext"
import { useContext } from "react"
const Navigation = (props) => {
    const homeState=useContext(homeContext)
    return <div className="h-full w-full py-[1rem] lg:pl-[5rem] lg:pr-[20%] flex flex-col justify-around items-center lg:items-start">

        <BotMessage message="Good evening" />

        <div className="w-full mt-3 h-[65vh] flex flex-col justify-between items-center lg:items-start">

            <div className="sm:w-[375px] w-[95%] h-[20vh] bg-white border-2 rounded-2 p-3 flex items-start hover:shadow-xl hover:z-10  transition-all duration-150 ease-in-out cursor-pointer"
            onClick={props.stress}
            >
                <Image src={checkStressLogo} className="w-[128px] h-[112px] mr-3" />
                <div> 
                    <h1 className="text-[20px] text-[#171A1FFF] font-semibold">Check My Stress</h1>
                    <p className="text-[#171A1FFF] text-[14px]">1 min stress check</p>
                </div>
            </div>

            {/* <div className="w-[375px] h-[20vh]  bg-white  rounded-2 p-3 flex flex-col justify-between">

                <p className="text-[16px] text-[#9095A1FF]">Average Stress Level</p>

                <p className="text-[32px] text-[#3F4FDBFF]">34%</p>

                <div className="flex">

                    <FontAwesomeIcon icon={faCaretDown} className="w-[12px] h-[12px] text-[#0DA23FFF] my-auto mr-1" />

                    <p className="text-[14px] text-[#0DA23FFF] mr-3">5%</p>

                    <p className="text-[14px] text-[#9095A1FF]">from last week</p>

                </div>

            </div> */}

            <div className="sm:w-[375px] h-[20vh] w-[95%] bg-white border-2 rounded-2 p-3 flex items-start hover:shadow-xl hover:z-10  transition-all duration-150 ease-in-out cursor-pointer"
            onClick={props.click}
            >

                <Image src={challengesImg} className="w-[128px] h-[112px] mr-3" />
                <div>
                    <h1 className="text-[20px] text-[#171A1FFF] font-semibold">Challenge Me</h1>
                    <p className="text-[#171A1FFF] text-[14px]">Challenge of the day</p>
                </div>

            </div>

            {/* <div className="w-[375px] h-[20vh] bg-white  rounded-2 p-3 flex flex-col justify-between">

                <p className="text-[16px] text-[#9095A1FF]">Challenges This Week</p>

                <p className="text-[32px] text-[#3F4FDBFF]">5</p>

                <div className="flex">

                    <p className="text-[14px] text-[#EE7E15FF] mr-3">3</p>

                    <p className="text-[14px] text-[#9095A1FF]">days since last challenge</p>

                </div>

            </div> */}

            <div className="sm:w-[375px] h-[20vh] w-[95%] bg-white border-2 rounded-2 p-3 flex items-start hover:shadow-xl   transition-all duration-150 ease-in-out cursor-pointer">

                <Image src={skillsImg} className="w-[128px] h-[112px] mr-3" />
                <div>
                    <h1 className="text-[20px] text-[#171A1FFF] font-semibold">Build My Skills</h1>
                    <p className="text-[#171A1FFF] text-[14px]">Personalized video playlist</p>
                </div>

            </div>

            {/* <div className="w-[375px] h-[20vh] bg-white  rounded-2 p-3">

                <p className="text-[16px] text-[#9095A1FF] w-max">Progress</p>

                <div className="flex">

                    <div className="mr-[5rem]">

                        <div className="flex items-center">
                            <h1 className="text-[#3F4FDBFF] text-[32px] mr-1">72%</h1>
                            <p className="text-[#9095A1FF] text-[12px]">completed</p>
                        </div>

                        <div className="flex items-center">
                            <h1 className="text-[#323743FF] text-[32px] mr-1">28%</h1>
                            <p className="text-[#9095A1FF] text-[12px]">In Progress</p>
                        </div>

                    </div>



                   
                    <div className="w-[6rem] h-full relative bottom-[2vh]">
                        <CircularProgressbar value={66} strokeWidth={7} styles={buildStyles({pathColor: '#3F4FDBFF',strokeLinecap: 'butt'})} />
                    </div>




                </div>


            </div> */}

        </div>

    </div>
}
export default Navigation