import SkipWrapper from "../DashBoardComponents/SkipWrapper"
import BotMessage from "../BotMessage"
import ProfileForm from "./ProfileForm"
import { useState } from "react"
import axios from "axios"
const ProfileDetails = (props) => {
    const [data,setData]=useState({linkedIn:"",occupation:"",fname:"",lname:""})
    const clickHandler=async()=>{
            const entries=Object.entries(data)
            .filter(([key, value]) => value !== "")
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
            await axios.post("/api/profileUpdate",{email:props.email,userData:{...entries}})
            props.click()
    }
    return <SkipWrapper bottom={false} click={clickHandler} next="save profile">

        <div className="lg:w-[50%] w-full pt-[2rem]  flex flex-col justify-between items-center">


            <BotMessage message="Tell us..."/>


            <div className="lg:w-[363px] w-full text-center lg:text-left lg:mt-0 mt-5">

                <h1 className="text-[48px] leading-[68px] font-bold">
                    A bit more about you...
                </h1>

                <div className="h-[2rem]"/>

                <h1 className="text-[48px] leading-[68px] font-bold">
                    for AI to give you better results.
                </h1>

            </div>

            <div className="lg:w-[483px] lg:mt-0 mt-5">

                <p className="text-[14px] text-center lg:text-left">This is private and secure. We will use this to design your journeys.</p>

            </div>

        </div>

        <ProfileForm click={props.click} email={props.email} onchange={(event)=>setData({...data,[event.target.id]:event.target.value})}/>



    </SkipWrapper>
}

export default ProfileDetails