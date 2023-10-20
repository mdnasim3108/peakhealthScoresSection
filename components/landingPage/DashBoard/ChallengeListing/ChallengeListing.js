import BotMessage from "../BotMessage"
import Challenge from "./Challenge"
import { useState, useEffect } from "react"
import axios from "axios"
import SkeletonLoader from "../../slideContents/skeletonLoader"
import React from "react"
const ChallengeListing = (props) => {
    const [message, setMessage] = useState("Your challenge of the day!")
    const [challenge, setChallenge] = useState([])
    const [random, setRandom] = useState(0)
    const call = async () => {
        const res = await axios.post("/api/challenges")
        console.log(res.data)
        setChallenge(res.data)
        setRandom(Math.floor(Math.random() * res.data.length))
    }
    useEffect(() => {
        call()
    }, [])
    return (
        <div className="lg:pl-[4rem]  pt-[3rem] lg:pr-[6rem] px-3 h-full w-full flex flex-col lg:items-start items-center">


            <BotMessage message={message} className="mb-4" />

            {
                challenge.length > 0 ? <Challenge
                    change={() => setMessage("Did You Complete the challenge?")}
                    roll={() => setRandom(Math.floor(Math.random() * challenge.length))}
                    challenge={challenge[random]}
                    click={props.click}
                    inst={()=>setMessage("The details of your challenges are...")}
                    back={()=>setMessage("Your challenge of the day!")}
                /> 
                :
                <SkeletonLoader top="top-10"/>
            }




        </div>
    )
}
export default ChallengeListing