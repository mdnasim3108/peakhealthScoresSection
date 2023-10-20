import React from "react"
const homeContext=React.createContext({
    home:true,
    dash:false,
    stress:false,
    setHome:()=>{}
})
export default homeContext;