import React from "react";
const authContext=React.createContext(
    {
        showAuth:false,
        signIn:false,
        signUp:false,
        change:()=>{},
        close:()=>{}
    }
)
export default authContext;