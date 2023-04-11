import React from "react";
const voiceContext=React.createContext({
    userData:{yearOfBirth:"",gender:""},
    sendAudio:()=>{},
    block:()=>{}
})
export default voiceContext;