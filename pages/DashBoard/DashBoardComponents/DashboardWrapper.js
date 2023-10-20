import Image from "next/image";
import logoImg from "../../../public/phLogo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faBell, faUser, faCaretDown, faWaveSquare, faBullseye, faPencil, faGear, faMedal, faPlay, faBook } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router';
import { useContext } from "react";
import homeContext from "@/components/landingPage/contextStrore/homeContext";
const DashBoardWrapper = (props) => {
    const router=useRouter()
    const homeState=useContext(homeContext)
    const ar=props.goals.flatMap((obj)=>obj.values)
    return <div>

        <div className={`h-[100vh] w-full ${props.navigation && "bg-[#F8F9FAFF]"} flex`}>

            <div className="w-[256px]  py-3 h-full bg-[#F3F4F6FF] flex flex-col justify-between items-center">

                <div className="flex items-center mr-[18%] px-10 w-full bg-[#F3F4F6FF]">
                    <Image
                        src={logoImg}
                        className="w-[35px] h-[35px] mr-3"
                    />

                    <span className="text-[25px] mr-1  text-[#ea7f17] font-bold font-rajdhani">
                        Stress
                    </span>
                    <span className="text-[25px] mr-1  text-[#4855dc] font-bold font-rajdhani">
                        Sense
                    </span>
                    <span className="text-[25px]   text-[#4855dc] font-bold font-rajdhani">
                        AI
                    </span>
                </div>

                <div className="flex flex-col w-full justify-between  h-[70%]">



                    <div className="pl-10 h-[60%] flex flex-col justify-between">

                        <div onClick={props.stress} className="cursor-pointer">
                            <FontAwesomeIcon icon={faWaveSquare} className="w-[20px] inline-block text-[#424856FF] mr-[8px]" />
                            <span className="text-[16px] text-[#424856FF] font-sansSerif">Stress Check</span>
                        </div>

                        <div
                        onClick={props.challenge}
                        className="cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faMedal} className="w-[20px] inline-block text-[#424856FF]  mr-[8px]" />
                            <span className="text-[16px] text-[#424856FF] font-sansSerif">Challenges</span>
                        </div>

                        <div
                        className="cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faPlay} className="w-[20px] mr-[8px] inline-block text-[#424856FF]" />
                            <span className="text-[16px] text-[#424856FF] font-sansSerif">Build Skills</span>
                        </div>

                        <div
                        className="cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faBook} className="w-[20px] mr-[8px] inline-block text-[#424856FF]" />
                            <span className="text-[16px] text-[#424856FF] font-sansSerif">Sense Reports</span>
                        </div>

                    </div>





                    <div>
                        <div className="w-[90%] h-[2px] my-[3rem] ml-[5%] bg-[#9095A1FF] border" />
                    </div>


                    <div className="w-full h-[60%] pl-10 flex flex-col justify-between">

                        <div className="flex justify-between pr-3">
                            <div className="mr-3">
                                <FontAwesomeIcon icon={faBullseye} className="w-[28px] mr-1 inline-block text-[#424856FF]" />
                                <span className="text-[16px] text-[#424856FF] font-sansSerif">Current Goals</span>
                            </div>
                            <FontAwesomeIcon icon={faPencil}
                             className="w-[20px] inline-block text-[#424856FF] cursor-pointer"
                             onClick={()=>{}}
                             />
                        </div>

                        <p className="text-[16px] text-[#424856FF] font-sansSerif">{ar[0]?ar[0]:"goal1 not set"}</p>

                        <p className="text-[16px] text-[#424856FF] font-sansSerif">{ar[1]?ar[1]:"goal2 not set"}</p>

                        <p className="text-[16px] text-[#424856FF] font-sansSerif">{ar[2]?ar[2]:"goal3 not set"}</p>

                    </div>





                </div>

                <div className=" px-10 flex justify-between items-center w-full">

                    <div>
                        <FontAwesomeIcon icon={faUser} className="text-[#424856FF] inline-block mr-2 w-[24px]" />
                        <p className="text-[16px] text-[#323743FF] inline">Amanda</p>
                    </div>

                    <FontAwesomeIcon icon={faGear} className="w-[24px] text-[#424856FF]" />

                </div>

            </div>

            <div className="h-[100vh] " style={{ width: "calc(100% - 256px)" }}>

                <div className="w-full h-[7vh] bg-white shadow-lg   z-10 pr-10 flex justify-end">

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

                <div className="h-[93vh]">  

                    {props.children}

                </div>



            </div>





        </div>





    </div>
}
export default DashBoardWrapper;