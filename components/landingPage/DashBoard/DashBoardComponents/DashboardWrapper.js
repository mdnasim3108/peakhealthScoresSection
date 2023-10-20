import Image from "next/image";
import logoImg from "../../../../public/phLogo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faBell, faUser, faCaretDown, faWaveSquare, faBullseye, faPencil, faGear, faMedal, faPlay, faBook, faClose, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from "react";
import homeContext from "../../contextStrore/homeContext";
import axios from "axios";
import { NotificationsNoneOutlined, HelpOutlineOutlined, KeyboardArrowDownOutlined, AccountCircleOutlined, ExitToAppOutlined } from "@mui/icons-material";
const DashBoardWrapper = (props) => {
    const router = useRouter()
    const homeState = useContext(homeContext)
    const [username, setusername] = useState(undefined)
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false)
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    useEffect(() => {
        const getuser = async () => {
            await axios.post("/api/getusername", { email: props.email })
                .then((res) => {
                    if (res.data.username) {
                        setusername(res.data.username)
                    }
                }
                )
        }
        getuser()
    }, [])
    return <div>

        <div className={`h-[100vh] w-full ${props.navigation && "bg-[#F8F9FAFF]"} flex`}>



            <div className={`lg:w-[256px] w-[75%]  py-3 h-full bg-[#F3F4F6FF] lg:static fixed z-20  flex flex-col justify-between items-center ${isMobileMenuOpen ? "left-0 " : "left-[-999px] "} transition-all duration-[400ms] ease-in-out`}>

                <div className="flex items-center justify-between mr-[18%] px-10 w-full bg-[#F3F4F6FF]">

                    <div className="w-full flex">

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
                            <span className="text-[10px]">(coming soon..)</span>
                        </div>

                        <div
                            className="cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faBook} className="w-[20px] mr-[8px] inline-block text-[#424856FF]" />
                            <span className="text-[16px] text-[#424856FF] font-sansSerif">Sense Reports</span>
                        </div>

                    </div>





                    <div className="">
                        <div className="w-[90%] h-[2px] my-[3rem] ml-[5%] bg-[#9095A1FF] border" />

                    </div>

                    <div className="w-[1rem] lg:hidden h-[3rem] bg-[#F3F4F6FF] absolute right-[-15px] bottom-[47%] rounded-tr-md rounded-br-md flex items-center justify-center "
                        onClick={toggleMobileMenu}
                    >
                        <FontAwesomeIcon icon={faCaretLeft} className="w-[0.7rem] text-[#9095A1FF]" />
                    </div>


                    <div className="w-full h-[60%] pl-10 flex flex-col justify-between">

                        <div className="flex justify-between pr-3">
                            <div className="mr-5">
                                <FontAwesomeIcon icon={faBullseye} className="w-[28px] mr-1 inline-block text-[#424856FF]" />
                                <span className="text-[16px] text-[#424856FF] font-sansSerif">Current Goals</span>
                            </div>
                            <FontAwesomeIcon icon={faPencil}
                                className="w-[20px] inline-block text-[#424856FF] cursor-pointer"
                                onClick={props.goalSelect}
                            />
                        </div>

                        <p className="text-[16px] text-[#424856FF] font-sansSerif">{props.goals[0] ? props.goals[0] : "goal1 not set"}</p>

                        <p className="text-[16px] text-[#424856FF] font-sansSerif">{props.goals[1] ? props.goals[1] : "goal2 not set"}</p>

                        <p className="text-[16px] text-[#424856FF] font-sansSerif">{props.goals[2] ? props.goals[2] : "goal3 not set"}</p>

                    </div>





                </div>

                <div className="px-3 flex justify-between items-center w-full">

                    <div>
                        <FontAwesomeIcon icon={faUser} className="text-[#424856FF] inline-block mr-2 w-[24px]" />
                        <p className="text-[16px] text-[#323743FF] inline">{username ? username : props.email.split("@")[0]}</p>
                    </div>

                    <FontAwesomeIcon
                        icon={faGear}
                        className="w-[24px] text-[#424856FF] cursor-pointer"
                        onClick={props.profile}
                    />

                </div>

            </div>


            <div className="h-[100vh] banner">

                {isMobileMenuOpen && <div className=" w-full nav-fade-in absolute h-[100vh] z-10 bg-black/75"
                    onClick={() => { setMobileMenuOpen(false) }}
                ></div>}

                <div className="w-full h-[7vh] bg-white shadow-lg   z-10 pr-10 flex justify-between lg:justify-end">

                    <div className={`lg:hidden my-auto ml-5`}>
                        <button
                            type="button"
                            className="text-gray-700 focus:outline-none "
                            onClick={toggleMobileMenu}
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>



                        </button>
                    </div>

                    <div className="flex justify-between items-center lg:w-[8%]">

                        <div className="w-[20px] cursor-pointer lg:block hidden">
                            {/* <FontAwesomeIcon icon={faCircleQuestion} className="text-gray-300" /> */}
                            <HelpOutlineOutlined className="text-[#9095A1FF] w-[24px] h-[24px] hover:text-[#6d717b] transition-all duration-200 ease-in-out" />
                        </div>

                        <div className="w-[20px] cursor-pointer hidden lg:block">
                            {/* <FontAwesomeIcon icon={faBell} className="text-gray-300" /> */}
                            <NotificationsNoneOutlined className="text-[#9095A1FF] hover:text-[#6d717b] transition-all duration-200 ease-in-out" />
                        </div>


                        <div className="w-[30px] h-[30px] cursor-pointer rounded-full border flex items-center justify-center border-[#9095A1FF] bg-[#9095A1FF] hover:bg-[#6d717b] transition-all duration-200 ease-in-out" onClick={() => setShowProfile(!showProfile)}>
                            {/* <FontAwesomeIcon icon={faUser} className="text-gray-300" /> */}
                            <p className="text-white">{username ? username.charAt(0).toUpperCase() : props.email.split("@")[0].charAt(0).toUpperCase()}</p>
                        </div>

                        <div className="w-[12px] relative lg:right-[1.7rem] cursor-pointer lg:hidden block" onClick={() => setShowProfile(!showProfile)}>
                            <KeyboardArrowDownOutlined className="text-[#9095A1FF] hover:text-[#6d717b] transition-all duration-200 ease-in-out w-[5px] h-[5px]" />
                            {/* <FontAwesomeIcon icon={faCaretDown} className="text-gray-300" /> */}
                        </div>

                    </div>

                </div>

                <div className="h-[93vh]" onClick={() => setShowProfile(false)}>

                    {
                        showProfile &&
                        <div className="fade-in absolute flex py-5 flex-col justify-between items-center h-[313px] w-[256px] bg-white shadow-md rounded-[2px] right-3 top-[8%] z-40">

                            <div className="w-full px-3 flex items-center">
                                <div className="w-[30px] mr-3 h-[30px] cursor-pointer rounded-full border flex items-center justify-center border-[#9095A1FF] bg-[#9095A1FF] hover:bg-[#6d717b] transition-all duration-200 ease-in-out" onClick={() => setShowProfile(!showProfile)}>
                                    <p className="text-white font-sansSerif">{username ? username.charAt(0).toUpperCase() : props.email.split("@")[0].charAt(0).toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className="text-[#171A1FFF] text-[14px] font-semibold font-sansSerif">{username}</p>
                                    <p className="text-[#9095A1FF] text-[12px] font-sansSerif">{props.email}</p>
                                </div>
                            </div>

                            <div className="w-full border border-[#DEE1E6FF]"/>

                            <div className="w-full px-3 cursor-pointer" onClick={props.profile}>
                                <AccountCircleOutlined className="text-[#565D6DFF] w-[22px] mr-3 inline-block" />
                                <p className="inline text-[#565D6DFF] font-sansSerif">Edit Profile</p>
                            </div>

                            <div className="w-full border border-[#DEE1E6FF]"/>

                            <div className="w-full px-3 cursor-pointer" onClick={props.goalSelect}>
                                <FontAwesomeIcon icon={faBullseye} className=" w-[22px] mr-3 inline-block text-[#565D6DFF]" />
                                <p className="inline text-[#565D6DFF] font-sansSerif">Change Goals</p>
                            </div>

                            <div className="w-full border border-[#DEE1E6FF]"/>

                            <div className="w-full px-3 cursor-pointer">
                                <HelpOutlineOutlined className="text-[#565D6DFF] w-[22px] mr-3 h-[24px] hover:text-[#6d717b] transition-all duration-200 ease-in-out inline-block" />
                                <p className="inline text-[#565D6DFF] font-sansSerif">Help Center</p>
                            </div>

                            <div className="w-full border border-[#DEE1E6FF]"/>

                            <div className="w-full px-3 cursor-pointer" onClick={props.signOut}>
                                <ExitToAppOutlined className="text-[#565D6DFF] w-[22px] mr-3 inline-block" />
                                <p className="inline text-[#565D6DFF] font-sansSerif">Sign Out</p>
                            </div>

                        </div>
                    }


                    {props.children}

                </div>






            </div>

        </div>





    </div>
}
export default DashBoardWrapper;