import { faGauge, faUserGroup, faBolt } from "@fortawesome/free-solid-svg-icons";
import Goals from "./goals";
import BotMessage from "../BotMessage";
import SkipWrapper from "../DashBoardComponents/SkipWrapper";
import { useState, useEffect, useReducer } from "react";
import axios from "axios";
const goalSelection = (props) => {
    // const [goals, setGoals] = useState(
    //     [{ goal: "Reduce Stress", values: [] }, { goal: "Improve Relations", values: [] }, { goal: "Boost Productivity", values: [] }]

    //     )
    const goals = [
        { goal: "Reduce Stress", selected: false },
        { goal: "Sleep Better", selected: false },
        { goal: "Enhance Mindfulness", selected: false },
        { goal: "Build Resilience", selected: false },
        { goal: "Cultivate Gratitude", selected: false },
        { goal: "Promote Work-Life Balance", selected: false },

        { goal: "Improve Assertiveness", selected: false },
        { goal: "Boost Confidence", selected: false },
        { goal: "Setting Boundaries", selected: false },
        { goal: "Conflict Resolution", selected: false },
        { goal: "Team Collaboration", selected: false },
        { goal: "Effective Communication", selected: false },

        { goal: "Boost Energy", selected: false },
        { goal: "Increase Focus", selected: false },
        { goal: "Improve Problem-Solving", selected: false },
        { goal: "Build Growth Mindset", selected: false },
        { goal: "Improve Time Management", selected: false },

    ]

    const goalsStateHandler = (state, action) => {
        switch (action.type) {
            case "pre_select_goals":
                const newGoals = state.goals.map((el) => {
                    if (action.goals.includes(el.goal)) return { goal: el.goal, selected: true }
                    else return el
                })
                return {goals:newGoals,selectedGoals:[...action.goals]}
            case "add_goal":
                const updatedGoals = [...state.goals]
                updatedGoals[action.index] = { goal: updatedGoals[action.index].goal, selected: true }
                return { goals: updatedGoals, selectedGoals: [...state.selectedGoals, action.id] }
            case "remove_goal":
                const newUpdatedGoals=[...state.goals]
                newUpdatedGoals[action.index]={goal:newUpdatedGoals[action.index].goal,selected:false}
                const updatedSelectedGoals = state.selectedGoals.filter((el) => el !== action.id)
                return { goals: newUpdatedGoals, selectedGoals: updatedSelectedGoals }
            default:
                return state
        }
    }

    const [goalsState, dispatchGoals] = useReducer(goalsStateHandler, { goals, selectedGoals: [] })
    const updateGoals =  () => {

        if (props.goals.length) {
            dispatchGoals({type:"pre_select_goals",goals:props.goals})
        }


    }
    useEffect(() => {
        // axios.post("/api/getGoals", { email: props.user })
        // .then((res)=>{console.log(res.data)})

        updateGoals()

    }, [])
    useEffect(() => {
        console.log(goalsState.selectedGoals)
    }, [goalsState.goals])

    const [prevGoals, setPrevGoals] = useState(undefined)
    // const goalsUpdateHandler = (event) => {
    //     console.log(event.target.id)
    //     setGoals((prev) => {
    //         const id = prev.findIndex((el) => el.goal === event.target.id)
    //         let newGoals = [...prev]
    //         if (prev.reduce((acc, obj) => acc + obj.selected, 0) < 3 && !newGoals[id].selected) {
    //             newGoals[id] = { goal: event.target.id, selected: true }
    //             return newGoals;
    //         }
    //         if (newGoals[id].selected) {
    //             newGoals[id] = { goal: event.target.id, selected: false }
    //             return newGoals;
    //         }
    //         return newGoals

    //     })
    // }

    const goalsUpdateHandler = (event) => {
        const id = goalsState.goals.findIndex((el) => el.goal === event.target.id)
        if (goalsState.goals.reduce((acc, obj) => acc + obj.selected, 0) < 3 && !goalsState.goals[id].selected) {
            dispatchGoals({ type: "add_goal", id: event.target.id,index:id })
        }
        if (goalsState.goals[id].selected) {
            dispatchGoals({ type: "remove_goal", id: event.target.id,index:id })
        }
    }

    // useEffect(() => {
    //     console.log(props.user)
    //     if (props.goals.length) {
    //         setPrevGoals(props.goals.flatMap((el) => el.values))
    //     }
    // }, [goals])
    // useEffect(()=>{
    //         console.log(goals.reduce((acc,obj)=>acc+obj.values.length,0))
    // },[goals])
    return (
        <SkipWrapper bottom={true} click={async () => {
            await axios.post("/api/userGoals", { goals: goalsState.selectedGoals, email: props.user })
            props.click(goalsState.selectedGoals)
        }} next="next" disabled={!(goalsState.selectedGoals.length == 3)}>

            <div className="lg:w-[50%] w-full h-full lg:pt-[5em] pt-3 pb-[1rem]  flex flex-col justify-between items-center">


                <BotMessage message="Tell us..." /> 


                <div className="lg:w-[363px] text-center lg:text-left lg:mt-0 mt-5">

                    <h1 className="lg:text-[48px] text-[38px] leading-[68px] font-bold">
                        What goals you want to achieve?
                    </h1>

                </div>

                <div className="lg:w-[483px] text-center">

                    <p className="text-[14px] ">This is private and secure. We will use this to design your journeys.</p>

                </div>

            </div>

            <div className="lg:w-[50%] w-full py-[1rem] flex flex-col justify-between items-center">
                <div className="lg:mt-0 mt-5">
                    <h1 className="text-[#171A1FFF] text-[18px]">Choose 3 goals in order of importance.</h1>
                </div>

                <Goals
                    icon={faGauge}
                    title="Reduce Stress"
                    options={goalsState.goals.filter((el, id) => id < 6)}
                    select={goalsUpdateHandler}
                    no={1}
                    count={goalsState.goals.reduce((acc, obj) => acc + obj.selected, 0)}
                    onclick={goalsUpdateHandler}
                    className="lg:mt-0 mt-5"
                />

                <Goals
                    icon={faUserGroup}
                    title="Improve Relations"
                    options={goalsState.goals.filter((el, id) => id > 5 && id < 12)}
                    select={goalsUpdateHandler} no={2}
                    count={goalsState.goals.reduce((acc, obj) => acc + obj.selected, 0)}
                    onclick={goalsUpdateHandler}
                    className="lg:mt-0 mt-5"
                />

                <Goals
                    icon={faBolt}
                    title="Boost Productivity"
                    options={goalsState.goals.filter((el, id) => id > 11 && id < goals.length)}
                    select={goalsUpdateHandler}
                    no={3}
                    count={goalsState.goals.reduce((acc, obj) => acc + obj.selected, 0)}
                    onclick={goalsUpdateHandler}
                    className="lg:mt-0 mt-5"
                />
                <div className="lg:mt-0 mt-5">
                    <p className="text-[#171A1FFF] text-[14px]">You will be able to update these goals later.</p>
                </div>
            </div>

        </SkipWrapper>
    )


}
export default goalSelection;