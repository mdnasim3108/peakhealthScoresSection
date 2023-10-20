import { faGauge, faUserGroup, faBolt } from "@fortawesome/free-solid-svg-icons";
import Goals from "./goals";
import BotMessage from "../BotMessage";
import SkipWrapper from "../DashBoardComponents/SkipWrapper";
import { useState, useEffect } from "react";
const goalSelection = (props) => {
    const [goals, setGoals] = useState([{ goal: "Reduce Stress", values: [] }, { goal: "Improve Relations", values: [] }, { goal: "Boost Productivity", values: [] }])
    const [prevGoals, setPrevGoals] = useState(undefined)
    const goalsUpdateHandler = (goalName, value) => {
        setGoals((prev) => {
            const id = prev.findIndex((el) => el.goal === goalName)
            const newGoals = [...goals]
            newGoals[id] = { goal: goalName, values: value }
            return newGoals;
        })
    }

    useEffect(() => {
        if (props.goals.length) {
            setPrevGoals(props.goals.flatMap((el) => el.values))
        }
    }, [goals])
    // useEffect(()=>{
    //         console.log(goals.reduce((acc,obj)=>acc+obj.values.length,0))
    // },[goals])
    return (
        <SkipWrapper bottom={true} click={() => props.click(goals)} disabled={!(goals.reduce((acc, obj) => acc + obj.values.length, 0) == 3)}>

            <div className="w-[50%] h-full py-[5rem]  flex flex-col justify-between items-center">


                <BotMessage message="Tell us..." />


                <div className="w-[363px] ">

                    <h1 className="text-[48px] leading-[68px] font-bold">
                        What goals you want to achieve?
                    </h1>

                </div>

                <div className="w-[483px]">

                    <p className="text-[14px] ">This is private and secure. We will use this to design your journeys.</p>

                </div>

            </div>

            <div className="w-[50%] py-[1rem] flex flex-col justify-between items-center">
                <div>
                    <h1 className="text-[#171A1FFF] text-[18px]">Choose 3 goals in order of importance.</h1>
                </div>

                <Goals
                    icon={faGauge}
                    title="Reduce Stress"
                    options={["Reduce Stress", "Sleep Better", "Enhance Mindfulness", "R&B", "Build Resilience", "Cultivate Gratitude", "Promote Work-Life Balance"]}
                    select={goalsUpdateHandler}
                    no={1}
                    count={goals.reduce((acc, obj) => acc + obj.values.length, 0)}
                    prevGoals={prevGoals}
                />

                <Goals
                    icon={faUserGroup}
                    title="Improve Relations"
                    options={["Improve Assertiveness", "Boost Confidence", "Setting Boundaries", "Conflict Resolution", "Team Collaboration", "Effective Communication"]}
                    select={goalsUpdateHandler} no={2}
                    count={goals.reduce((acc, obj) => acc + obj.values.length, 0)}
                    prevGoals={prevGoals}
                />  

                <Goals
                    icon={faBolt}
                    title="Boost Productivity"
                    options={["Boost Energy", "Increase Focus", "Improve Problem-Solving", "Build Growth Mindset", "Improve Time Management"]}
                    select={goalsUpdateHandler} no={3}
                    count={goals.reduce((acc, obj) => acc + obj.values.length, 0)}
                    prevGoals={prevGoals}
                />
                <div>
                    <p className="text-[#171A1FFF] text-[14px]">You will be able to update these goals later.</p>
                </div>
            </div>

        </SkipWrapper>
    )


}
export default goalSelection;