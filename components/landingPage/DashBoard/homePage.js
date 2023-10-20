import DashBoardWrapper from "./DashBoardComponents/DashboardWrapper";
import Navigation from "./navigation";
import ChallengeListing from "./ChallengeListing/ChallengeListing";
import { useState, useEffect, useContext } from "react";
import GoalSelection from "./goalSelection/goalSelection";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import HomeContextProvider from "../contextStrore/homeContextProvider";
import voiceContext from "../contextStrore/voiceContext";
import axios from "axios";
const homePage = (props) => {
    const [goals, setGoals] = useState([])
    const [dashState, setDashState] = useState(!props.dash ? {
        goals: true,
        dash: { dashboard: false, challenge: false },
        profile: false,
        fromDash: false,
    } :
        {
            goals: false,
            dash: { dashboard: true, challenge: false },
            profile: false,
            fromDash: false,
        }
    )

    const checkUpdatedUser = async () => {
        console.log("checkFunc")

    }


    useEffect(() => {
        axios.post("/api/getGoals", { email: props.email })
            .then((res) => {
                if (res.data.goals) {
                    console.log(res.data.goals)
                    setDashState({
                        goals: false,
                        dash: { dashboard: true, challenge: false },
                        profile: false,
                        fromDash: false,
                    })
                    setGoals(res.data.goals)
                }

            })
    }, [])

    // useEffect(()=>{
    //     console.log(voiceState)
    // },[])
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
                user={props.email}
            />}

            {
                dashState.dash.dashboard && <DashBoardWrapper
                    signOut={props.signOut}
                    email={props.email}
                    profile={()=>setDashState({ ...dashState, dash:{dashboard:false,challenge:dashState.dash.challenge},profile:true})}
                    goals={goals}
                    goalSelect={() => setDashState({ ...dashState, dash: { dashboard: false, challenge: dashState.dash.challenge }, fromDash: true, goals: true })} stress={props.stress}
                    challenge={() => setDashState({ ...dashState, dash: { dashboard: true, challenge: true } })}
                >
                    {dashState.dash.challenge ? <ChallengeListing goals={goals} click={() => setDashState({ ...dashState, profile: false, dash: { dashboard: true, challenge: false } })} /> : <Navigation click={() => setDashState({ ...dashState, dash: { dashboard: true, challenge: true } })} stress={props.stress} />}
                </DashBoardWrapper>
            }

            {
                dashState.profile && <ProfileDetails click={() =>{
                    setDashState({ ...dashState, profile: false, dash: { dashboard: true, challenge: dashState.dash.challenge } })
                } } email={props.email}/>
            }

            


        </HomeContextProvider>


    )



}
export default homePage