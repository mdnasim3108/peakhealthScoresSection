import HomeContext from "./homeContext";
import { useState } from "react";
const homeContextProvider=(props)=>{
    const [home,setHome]=useState({home:true})
    return <HomeContext.Provider value={{home,setHome}}>
                    {props.children}
    </HomeContext.Provider>
}
export default homeContextProvider;