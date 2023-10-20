import SkipWrapper from "../DashBoardComponents/SkipWrapper"
import BotMessage from "../BotMessage"
import ProfileForm from "./ProfileForm"
const ProfileDetails = (props) => {
    return <SkipWrapper bottom={false} click={props.click}>

        <div className="w-[50%] h-full pt-[2rem]  flex flex-col justify-between items-center">


            <BotMessage message="Tell us..." />


            <div className="w-[363px] ">

                <h1 className="text-[48px] leading-[68px] font-bold">
                    A bit more about you...
                </h1>

                <div className="h-[2rem]"/>

                <h1 className="text-[48px] leading-[68px] font-bold">
                    for AI to give you better results.
                </h1>

            </div>

            <div className="w-[483px]">

                <p className="text-[14px] ">This is private and secure. We will use this to design your journeys.</p>

            </div>

        </div>

        <ProfileForm click={props.click}/>



    </SkipWrapper>
}

export default ProfileDetails