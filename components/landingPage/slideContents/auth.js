import Image from "next/image"
import authImage from "../../../public/auth.jpg";
import { GoogleAuthProvider, signInWithPopup, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import app from "../../../firebase.config";
import googleImage from "../../../public/googleIcon.svg";
import { useState, useEffect, useContext } from "react";
import voiceContext from "../contextStrore/voiceContext";
import ContentContext from "../contextStrore/contentContext";
import axios from "axios";
import authContext from "../contextStrore/authContext";
import homeContext from "../contextStrore/homeContext";
import { useRouter } from 'next/router';
const Auth = (props) => {
    const router = useRouter();

    


    const [secret, setSecret] = useState(Math.floor(Math.random() * 1000000))
    const homeState = useContext(homeContext)
    const [otp, setOtp] = useState("")
    const [otpValid, setOtpValid] = useState(true)

    const provider = new GoogleAuthProvider();
    const voiceState = useContext(voiceContext)
    const content = useContext(ContentContext)
    const auth = getAuth(app)
    const [value, setValue] = useState({ value: "", isValid: true })
    const [pass, setPass] = useState({ value: "", isValid: true })
    const [hideSign, setHideSign] = useState(false)
    const [email, setEmail] = useState("")
    const authState = useContext(authContext)

    // useEffect(()=>{
    //     if(voiceState.voiceFeatures.registered){
    //         router.push("/gamifiedChallenges/goalSelection") 
    //     }
    // },[voiceState.voiceFeatures.registered])


    const signInHandleClick = async () => {
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result.user.email)
            const res = await axios.post("/api/isAuth", { email: result.user.email })
            console.log(res.data)
            content.hideSignUp()
            if (res.data.audio) {
                authState.close()
                props.toastSuccess("sign in sucessfull!")
                voiceState.registerUser({
                    gender: res.data.gender,
                    year: res.data.year,
                    email: res.data.email
                });
                
                setTimeout(() => {
                    content.resetContent(2)
                    // router.push("/gamifiedChallenges/goalSelection")

                    homeState.setHome({dash:true})
                }, 3000)
            }
            else if (res.data === "not found") {
                authState.close()
                voiceState.failAuth()
            }
        }).catch((error) => console.log(error))
    }

    const signUpHandleClick = () => {
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result.user.email)
            const res = await axios.post("/api/isAuth", { email: result.user.email })
            console.log(res.data)
            if (res.data.audio) {
                props.toastFail("user already exists!")
                return
            }
            await axios.post("/api/email", { id: voiceState.voiceFeatures.objId, email: result.user.email })
            props.toastSuccess("sign up sucessfull!")
            setTimeout(() => {
                content.hideSignUp()
                authState.close()
            }, 3000)

        }).catch((error) => console.log(error))
    }

    const handleClick = !authState.signIn ? signUpHandleClick : signInHandleClick

    const signInSubmitHandler = async (e) => {
        e.preventDefault()
        if (value.value === "" || !value.isValid) {
            setValue({ ...value, isValid: false })
            return
        }
        else if (pass.value === "" || !pass.isValid) {
            setPass({ ...pass, isValid: false })
            return
        }
        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                value.value,
                pass.value
            );
            const user = userCredentials.user;
            const res = await axios.post("/api/isAuth", { email: user.email })
            content.hideSignUp()
            if (res.data.audio) {
                props.toastSuccess("sign in sucessfull!")

                setTimeout(() => {
                    authState.close()
                    content.resetContent(2)
                    voiceState.registerUser({
                        gender: res.data.gender,
                        year: res.data.year,
                        email: res.data.email
                    });
                    homeState.setHome({dash:true})
                }, 3000)
            }
            else props.toastFail("you have not made a stress check before!")
        }
        catch (er) {
            props.toastFail("check your email and password!")
        }

    }

    const signUpSubmitHandler = async (e) => {
        e.preventDefault();
        if (value.value === "" || !value.isValid) {
            setValue({ ...value, isValid: false })
            return
        }
        else if (pass.value === "" || !pass.isValid) {
            setPass({ ...pass, isValid: false })
            return
        }
        const res = await axios.post("/api/isAuth", { email: value.value })
        console.log(res)
        if (res.data.audio) {
            props.toastFail("user already exists!!")
            return
        }

        const res1 = await axios.post("/api/sendMail", { to: value.value, otp: secret,firstName:value.value.split("@")[0] });
        console.log(res1)
        setHideSign(true)

    }
    const forgotSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const userCredentials = await sendPasswordResetEmail(auth, email);
            props.toastSuccess("password reset link sent to the registered email")
            setValue({ value: email, isValid: true })
            setHideSign(false)
        } catch {
            props.toastFail("The email is not registered!")
        }
    }
    const otpSubmitHandler = async (e) => {
        e.preventDefault()
        if (secret === +otp) {
            try {
                const userCredentials = await createUserWithEmailAndPassword(
                    auth,
                    value.value,
                    pass.value
                );
                const user = userCredentials.user;
                console.log(user)
                await axios.post("/api/email", { id: voiceState.voiceFeatures.objId, email: user.email })
                props.toastSuccess("sign up sucessfull!")
                setTimeout(() => {
                    content.hideSignUp()
                    authState.close()
                }, 3000)
            }
            catch {
                props.toastFail("user already exists!")
            }
        }
        else {
            setOtpValid(false)
        }
    }

    const signInHideContent = <div className="lg:w-[50%] w-full flex flex-col lg:m-0 mt-3 items-center justify-center text-center">
        <div className="lg:w-[70%] w-full text-center">
            <form onSubmit={forgotSubmitHandler} className="text-center" >
                <label className="text-lg text-center my-4">Enter the registered Email</label>
                <input
                    className={`border-[1.5px] my-4  rounded shadow appearance-none border-gray-400 focus:border-gray-600    text-lg focus:outline-none  transition-all duration-75 ease-linear w-full pl-3 py-2`}
                    placeholder="Email"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-[#4285f4] text-lg font-bold  text-white  w-max px-[20px] py-3  rounded-lg  transition-all duration-75 ease-linear"
                >
                    Send password reset link
                </button>
            </form>
        </div>
    </div>

    const signUpHideContent = <div className="lg:w-[50%] w-full flex flex-col lg:m-0 mt-3 items-center justify-center text-center">
        <div className="lg:w-[70%] w-full text-center">
            <form onSubmit={otpSubmitHandler} className="text-center" >
                <label className="text-lg text-center my-4">{`Enter the OTP sent to ${value.value}`}</label>
                <input
                    className={`border-[1.5px] my-4  rounded shadow appearance-none ${!otpValid ? "border-red-400 focus:border-red-600" : "border-gray-400 focus:border-gray-600"}      text-lg focus:outline-none  transition-all duration-75 ease-linear w-full pl-3 py-2`}
                    placeholder="OTP"
                    type="number"
                    required
                    onChange={(e) => setOtp(e.target.value)}
                />
                <p className={`text-sm mb-3 ml-2 text-red-500  ${!otpValid ? "visible" : "invisible"}`}>The OTP is inCorrect</p>
                <button
                    type="submit"
                    className="bg-[#4285f4]  text-white text-lg font-bold  w-max px-[20px] py-3  rounded-lg  transition-all duration-75 ease-linear"
                >
                    Verify
                </button>
            </form>
        </div>
    </div>





    const submitHandler = !authState.signIn ? signUpSubmitHandler : signInSubmitHandler

    return <div className="flex flex-col lg:flex-row lg:pl-8">
        {
            !authState.signUp ?

                <div className="lg:w-[50%] w-full lg:m-0 mx-auto mb-5 flex items-center justify-center md:block">
                    <Image
                        src={authImage}
                        className="lg:w-full w-[80%]"
                    />
                </div>
                :
                <div className="lg:w-[50%] w-full  mb-5 border-2 rounded p-5">

                    <h1 className="xl:text-3xl lg:text-2xl font-rajdhani text-xl font-bold">
                        Get deep insights to unlock personal
                        growth.
                    </h1>
                    <ul className="text-left list-disc mt-8 text-lg text-gray-500 pl-6">
                        <li className="mb-6">
                            <p className="">Access comprehensive reports that make sense of
                                your stress scores and patterns</p>
                        </li>
                        <li className="mb-6">
                            <p className="">Understand the contextual relevance of your stress
                                levels in different situations</p>
                        </li>
                        <li className="mb-6">
                            <p className="">Uncover hidden stress triggers and links to energy,
                                sleep and productivity,</p>
                        </li>

                    </ul>

                    <h1 className="xl:text-3xl lg:text-2xl font-rajdhani text-xl font-bold text-center">
                        Sign up for free!
                    </h1>

                </div>

        }
        {!hideSign ? <div className="lg:w-[50%] w-full flex flex-col items-center justify-center">
            <button
                className="bg-[#4285f4] hover:bg-[#1d6ae5] lg:w-[70%] w-full py-2 text-lg font-bold  rounded-lg flex items-center justify-center transition-all duration-75 ease-linear"
                onClick={handleClick}
            >
                <Image
                    src={googleImage}
                    className="mr-3 rounded md:w-[2rem] sm:w-[1.8rem] w-[1.5rem]"
                />
                <p className="text-lg  text-white ">continue with Google</p>
            </button>
            <div className="flex items-center mt-4 lg:w-[70%] w-full">
                <div className="bg-gray-300 w-[48%] h-[1px]" />
                <h1 className="text-gray-400 mx-2">OR</h1>
                <div className="bg-gray-300 w-[48%] h-[1px]" />
            </div>
            <div className="lg:w-[70%] w-full mt-4">
                <form className="" onSubmit={submitHandler}>                                                                  
                    {/* <label className="text-lg text-left">Email</label> */}
                    <input
                        className={`border-[1.5px] my-2  rounded shadow appearance-none ${value.isValid ? "border-gray-400 focus:border-gray-600" : "border-red-500 focus:border-red-500"}    text-lg focus:outline-none  transition-all duration-75 ease-linear w-full pl-3 py-2`}
                        placeholder="Your Email Address"
                        value={value.value}
                        onChange={(e) => {
                            setValue({
                                value: e.target.value, isValid: e.target.value.includes("@") && e.target.value.includes(".")
                            })
                        }}
                    />
                    <p className={`text-sm ml-2 text-red-500 mt-2 ${!value.isValid ? "visible" : "invisible"}`}>Enter a valid email</p>
                    {/* <label className="text-lg text-left ">{authState.signIn ? "Password" : "set password"}</label> */}
                    <input
                        className={`border-[1.5px] mt-1  rounded shadow appearance-none ${pass.isValid ? "border-gray-400 focus:border-gray-600" : "border-red-500 focus:border-red-500"}    text-lg focus:outline-none  transition-all duration-75 ease-linear w-full pl-3 py-2`}
                        placeholder="Your Password"
                        type="password"
                        onChange={(e) => {
                            setPass({
                                value: e.target.value, isValid: e.target.value.length >= 6
                            })
                        }}
                    /> 
                    <p className={`text-sm ml-2 text-red-500 mt-2 ${!pass.isValid ? "visible" : "invisible"}`}>Enter atleast 6 characters</p>
                    <div className="text-center">
                        <button
                            type="submit"
                            className=" border-[#3F4FDB] border-2 text-lg font-bold hover:bg-[#3F4FDB] hover:text-white text-[#3F4FDB]  mt-4 w-max px-[20px] py-3 rounded-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                        >
                            {!authState.signIn ? "Sign Up" : "sign in"}
                        </button>
                    </div>

                    {authState.signIn && <p
                        className="mt-3 text-center cursor-pointer underline"
                        onClick={() => setHideSign(true)}
                    >
                        Forgot password
                    </p>}
                </form>
                <p className="text-sm text-gray-800 mt-4">By continuing, you agree to the Terms of use and Privacy Policy of Peak Health Technologies.
                </p>
            </div>
        </div> :
            !authState.signUp ? signInHideContent : signUpHideContent
        }
    </div>


}
export default Auth