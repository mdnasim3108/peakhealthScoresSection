import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faAngleRight, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import BotMessage from "../BotMessage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const challenge = (props) => {
    const toastifySuccess = (msg) => {
        toast.success(msg, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    const [challengeState, setChallengeState] = useState({ accept: true, inst: false, count: false, confirmation: false, status: "" })
    return <div className="mt-8">
        <ToastContainer />
        <div className="w-full py-6 pl-10 pr-7 flex justify-between items-center bg-[#F8F9FAFF]">

            <h1 className="text-[24px] text-[#171A1FFF]">{props.challenge.Challenge_Title}</h1>


            {challengeState.count ? <CountdownCircleTimer
                isPlaying
                duration={10}
                colors={["#3F4FDBFF", "#3F4FDBFF", "#3F4FDBFF", "#3F4FDBFF"]}
                colorsTime={[7, 5, 2, 0]}
                size={70}
                strokeWidth={5}
                strokeLinecap="butt"
                rotation="counterclockwise"
                onComplete={() => {
                    setChallengeState({ ...challengeState, count: false, inst: false, confirmation: true })
                    props.change()
                }}
            >
                {({ remainingTime }) => {
                    return (
                        <div>
                            <div className=" border border-[#3F4FDBFF] px-1">
                                <p className="text-[#3F4FDBFF] text-[12px]">1 min</p>
                            </div>

                        </div>
                    );
                }}
            </CountdownCircleTimer> :
                <div className=" border border-[#3F4FDBFF] px-1">
                    <p className="text-[#3F4FDBFF] text-[12px]">1 min</p>
                </div>
            }



        </div >





        {challengeState.accept && <div className="w-full pl-10 pr-5 flex justify-between mt-8 items-center">


            < div >

                <div className="border rounded shadow-lg w-[160px] h-[64px] p-2 inline-block mr-2">

                    <h1 className="text-[20px] text-[#3F4FDBFF]">{props.challenge.
                        Challengers_Count
                    }</h1>

                    <p className="text-[#9095A1FF] text-[12px]">challengers</p>
                </div>

                <div className="border rounded shadow-lg w-[160px] h-[64px] p-2 inline-block">

                    <h1 className="text-[20px] text-[#3F4FDBFF]">{props.challenge.Challenge_Effort}</h1>

                    <p className="text-[#9095A1FF] text-[12px]">Difficulty</p>
                </div>

            </div >


            <div>

                <button className="border border-[#3F4FDBFF] py-1 px-4 border-r-2"
                    onClick={() => {
                        toastifySuccess("Great choice!")
                        setTimeout(() => {
                            setChallengeState({ ...challengeState, inst: true, accept: false })
                        }, 3000)

                    }}
                >


                    <FontAwesomeIcon icon={faCheck} className="text-[#3F4FDBFF] w-[1rem] mr-1 inline-block" />
                    <p className="text-[#3F4FDBFF] text-[14px] inline-block">I Accept</p>
                </button>

                <button className="border border-[#3F4FDBFF] py-1 px-4 border-l-2"
                    onClick={props.roll}
                >
                    <FontAwesomeIcon icon={faAngleRight} className="text-[#3F4FDBFF] w-[10px] mr-1 inline-block" />
                    <p className="text-[#3F4FDBFF] text-[14px] inline-block">Next Challenge</p>
                </button>

            </div>

        </div >}
        {challengeState.inst &&
            <div className="w-full mt-4">

                <h1 className="text-[#171A1FFF] text-[20px] font-semibold">Instructions</h1>


                <ul className="w-full flex flex-col h-[30vh] justify-between mt-3">

                    {props.challenge.Challenge_Instructions.split(".").map((inst) => {
                        return <li className="text-[#171A1FFF] text-[18px] font-sansSerif">{inst}</li>
                    })}


                    {/* <li className="text-[#171A1FFF] text-[18px] font-sansSerif">Take a deep breath and slowly drink the water, savoring each sip.</li>

                    <li className="text-[#171A1FFF] text-[18px] font-sansSerif">Focus on how the water feels in your mouth and throat, and how it helps you feel refreshed and energized. </li>

                    <li className="text-[#171A1FFF] text-[18px] font-sansSerif">Once you've finished the water, take a moment to notice how you feel and set an intention to drink more water throughout the day.</li> */}

                </ul>

                <div className="w-full text-center mt-8 cursor-pointer">
                    {!challengeState.count && <div className="inline-block mr-3" onClick={() => setChallengeState({ ...challengeState, inst: false, accept: true })}>

                        <FontAwesomeIcon icon={faArrowLeft} className="text-[#9095A1FF] w-[1rem] h-[1rem] inline-block mr-1" />

                        <p className="text-[#9095A1FF] text-[14px] inline-block">Back</p>

                    </div>}

                    <button className="border border-[#3F4FDBFF] py-1 px-6 bg-[#3F4FDBFF] inline-block"
                        onClick={() => setChallengeState({ ...challengeState, count: true })}
                    >

                        <p className="text-white text-[14px] inline-block mr-1">Start</p>

                        <FontAwesomeIcon icon={faArrowRight} className="text-white w-[13px] mr-1 inline-block" />

                    </button>
                </div>

            </div>}


        {
            challengeState.confirmation &&

            <div className="w-full mt-5">

                <div className="w-full text-center">


                    <button className={`border border-[#3F4FDBFF] ${challengeState.status==="comp" && "bg-[#3F4FDBFF]"} py-1 px-4 border-r-2`}
                        onClick={() => setChallengeState({ ...challengeState, status: "comp" })}
                    >

                        <FontAwesomeIcon icon={faCheck} className={`${challengeState.status==="comp" ? "text-white" : "text-[#3F4FDBFF]"} w-[1rem] mr-1 inline-block`} />
                        <p className={`${challengeState.status==="comp" ? "text-white" : "text-[#3F4FDBFF]"} text-[14px] inline-block`}>Yes,I did it</p>
                    </button>

                    <button className={`border border-[#3F4FDBFF] ${challengeState.status==="notComp" && "bg-[#3F4FDBFF]"} py-1 px-4 border-l-2`}
                        onClick={() => setChallengeState({ ...challengeState, status: "notComp" })}
                    >

                        <FontAwesomeIcon icon={faAngleRight} className={`${challengeState.status==="notComp" ? "text-white" : "text-[#3F4FDBFF]"} w-[10px] mr-1 inline-block`} />
                        <p className={` ${challengeState.status==="notComp"?"bg-[#3F4FDBFF] text-white":"text-[#3F4FDBFF]"} text-[14px] inline-block`}>No, I did not do it</p>
                    </button>

                </div>

                {challengeState.status==="comp" && <BotMessage
                    head="Well Done!"
                    message={props.challenge.Challenge_Positive_Reinforcement}
                    class="mt-4"
                />
        }
                {challengeState.status==="notComp" &&
                <BotMessage
                    head="No problem!"
                    message={props.challenge.Challenge_Negative_Reinforcement}
                    class="mt-4"
                />

            }

                <div className="w-full text-center cursor-pointer mt-5">

                    <div className="" onClick={props.click}>

                        <FontAwesomeIcon icon={faArrowLeft} className="text-[#9095A1FF] w-[1rem] h-[1rem] inline-block mr-1" />

                        <p className="text-[#9095A1FF] text-[14px] inline-block">Home</p>

                    </div>

                </div>


            </div>

        }

    </div >
}
export default challenge;