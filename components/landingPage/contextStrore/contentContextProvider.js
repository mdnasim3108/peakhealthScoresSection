import ContentContext from "./contentContext";
import { useState } from "react";
const contentContextProvider=(props)=>{
    const [contentNumber, setContent] = useState(0)
    const moveHandler = () => setContent((prev) => {
        return prev + 1;
      })
      const resetHandler = (n) => setContent(n)
    return(
        <ContentContext.Provider value={{contentNumber,moveContent:moveHandler,resetContent:resetHandler}}>
            {props.children}
        </ContentContext.Provider>
    )
}
export default contentContextProvider;