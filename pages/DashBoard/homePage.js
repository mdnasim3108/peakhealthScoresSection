import DashBoardWrapper from "./DashBoardComponents/DashboardWrapper";
import Navigation from "./navigation";
import ChallengeListing from "./ChallengeListing/ChallengeListing";
import { useState, useEffect } from "react";
import GoalSelection from "./goalSelection/goalSelection";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import HomeContextProvider from "@/components/landingPage/contextStrore/homeContextProvider";
const homePage = (props) => {
    const [goals, setGoals] = useState([])
    const [dashState, setDashState] = useState({
        goals: true,
        dash: { dashboard: false, challenge: false },
        profile: false,
        fromDash: false,
    })
    //  useEffect(()=>{
    //     console.log(goals)
    //  },[goals])  

    return (
        <HomeContextProvider>

            {dashState.goals && <GoalSelection click={(goals) => {
                setDashState((prev) => {
                    if (!dashState.fromDash) return { ...dashState, goals: false, profile: true }
                    else return { ...dashState, goals: false, dash: { dashboard: true, challenge: prev.dash.challenge } }
                })
                console.log(goals)
                setGoals(goals)
            }}
                goals={goals}
            />}

            {
                dashState.dash.dashboard && <DashBoardWrapper
                    goals={goals}
                    goalSelect={() => setDashState({ ...dashState, dash: { dashboard: false, challenge: dashState.dash.challenge }, fromDash: true, goals: true })} stress={props.stress}
                    challenge={() => setDashState({ ...dashState, dash: { dashboard: true, challenge: true } })}
                >
                    {dashState.dash.challenge ? <ChallengeListing goals={goals} click={() => setDashState({ ...dashState, profile: false, dash: { dashboard: true, challenge: false } })} /> : <Navigation click={() => setDashState({ ...dashState, dash: { dashboard: true, challenge: true } })} stress={props.stress} />}
                </DashBoardWrapper>
            }

            {
                dashState.profile && <ProfileDetails click={() => setDashState({ ...dashState, profile: false, dash: { dashboard: true, challenge: false } })} />
            }

        </HomeContextProvider>


    )



}
export default homePage