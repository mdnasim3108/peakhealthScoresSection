import HomeContext from "./homeContext";
import { useState } from "react";
const homeContextProvider=(props)=>{
    const [showHome,setShowHome]=useState(true)
    return <HomeContext.Provider value={{showHome,setShowHome}}>
                    {props.children}
    </HomeContext.Provider>
}
export default homeContextProvider;