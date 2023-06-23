import ContentContext from "./contentContext";
import { useState } from "react";
const contentContextProvider=(props)=>{
    const [contentNumber, setContent] = useState(1)
    const [signUp,showSignUp]=useState(true)
    const moveHandler = () => setContent((prev) => {
        return prev + 1;
      })
      const resetHandler = (n) => setContent(n)
      const showHandler=()=>showSignUp(false)
    return(
        <ContentContext.Provider value={{contentNumber,moveContent:moveHandler,resetContent:resetHandler,hideSignUp:showHandler,showSignUp:signUp}}>
            {props.children}
        </ContentContext.Provider>
    )
}
export default contentContextProvider;