import React from "react";
const voiceContext=React.createContext({
    userData:{yearOfBirth:"",gender:""},
    sendAudio:()=>{}
})
export default voiceContext;