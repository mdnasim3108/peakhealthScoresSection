import BotMessage from "../BotMessage"
import Challenge from "./Challenge"
import { useState, useEffect } from "react"
import axios from "axios"
import SkeletonLoader from "@/components/landingPage/slideContents/skeletonLoader"
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
        <div className="pl-[4rem]  pt-[3rem] pr-[6rem] h-full w-full">


            <BotMessage message={message} />

            {
                challenge.length > 0 ? <Challenge
                    change={() => setMessage("Did You Complete?")}
                    roll={() => setRandom(Math.floor(Math.random() * challenge.length))}
                    challenge={challenge[random]}
                    click={props.click}
                /> 
                :
                <SkeletonLoader top="top-10"/>
            }




        </div>
    )
}
export default ChallengeListing