import AuthContext from "./authContext"
import { useState } from "react"
const authContextProvider = (props) => {


    const [auth, setAuth] = useState({ showAuth: false, signIn: false, signUp: false })

    return <AuthContext.Provider value={{
        ...auth,
        change: (mode) => setAuth((prev) => { return { ...prev, ...mode } }),
        close:()=>setAuth((prev)=>{return {showAuth:false,signIn:false,signUp:false}})
    }}>
        {props.children}
    </AuthContext.Provider>

}

export default authContextProvider;