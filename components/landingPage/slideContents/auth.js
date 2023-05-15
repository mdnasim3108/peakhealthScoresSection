import Image from "next/image"
import authImage from "../../../public/auth.jpg";
import { GoogleAuthProvider, signInWithPopup, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import app from "../../../firebase.config";
import googleImage from "../../../public/googleIcon.svg";
import { useState, useEffect, useContext } from "react";
import voiceContext from "../contextStrore/voiceContext";
import ContentContext from "../contextStrore/contentContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const Auth = (props) => {
    const [secret, setSecret] = useState(Math.floor(Math.random() * 1000000))
    const [otp, setOtp] = useState("")
    const [otpValid, setOtpValid] = useState(true)
    const toastifySuccess = (msg) => {
        toast.success(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    const toastifyFailure = (msg) => {
        toast.error(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    const provider = new GoogleAuthProvider();
    const voiceState = useContext(voiceContext)
    const content = useContext(ContentContext)
    const auth = getAuth(app)
    const [value, setValue] = useState({ value: "", isValid: true })
    const [pass, setPass] = useState({ value: "", isValid: true })
    const [hideSign, setHideSign] = useState(false)
    const [email, setEmail] = useState("")
    const signInHandleClick = async () => {
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result.user.email)
            const res = await axios.post("/api/isAuth", { email: result.user.email })
            console.log(res.data)
            content.hideSignUp()
            if (res.data.audio) {
                toastifySuccess("sign in sucessfull!")
                voiceState.registerUser({
                    gender: res.data.gender,
                    year: res.data.year,
                    email: res.data.email
                });
                setTimeout(() => {
                    props.confirm()
                    content.resetContent(2)
                }, 3000)
            }
            else if (res.data === "not found") {
                props.confirm()
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
                toastifyFailure("user already exists!")
                return
            }
            await axios.post("/api/email", { id: voiceState.voiceFeatures.objId, email: result.user.email })
            toastifySuccess("sign up sucessfull!")
            setTimeout(() => {
                content.hideSignUp()
                props.confirm()
            }, 3000)

        }).catch((error) => console.log(error))
    }

    const handleClick = props.signUp ? signUpHandleClick : signInHandleClick

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
                voiceState.registerUser({
                    gender: res.data.gender,
                    year: res.data.year,
                    email: res.data.email
                });
                toastifySuccess("sign in sucessfull!")
                setTimeout(() => {
                    props.confirm()
                    content.resetContent(2)
                }, 3000)
            }
            else toastifyFailure("you have not made a stress check before!")
        }
        catch (er) {
            toastifyFailure("check your email and password!")
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
        if(res.data.audio){
            toastifyFailure("user already exits!!")
            return
        }
        const res1=await axios.post("/api/sendMail",{to:value.value,otp:secret});
        console.log(res)
        setHideSign(true)
    
    }
    const forgotSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const userCredentials = await sendPasswordResetEmail(auth, email);
            toastifySuccess("password reset link sent to the registered email")
            setValue({ value: email, isValid: true })
            setHideSign(false)
        } catch {
            toastifyFailure("The email is not registered!")
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
                toastifySuccess("sign up sucessfull!")
                setTimeout(() => {
                    content.hideSignUp()
                    props.confirm()
                }, 3000)
            }
            catch {
                toastifyFailure("user already exists!")
            }
        }
        else {
            setOtpValid(false)
        }
    }
    const signInHideContent = <div className="md:w-[50%] w-full flex flex-col md:m-0 mt-3 items-center justify-center text-center">
        <div className="md:w-[70%] w-full text-center">
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
                    className="bg-[#5c5c6b]  text-white hover:bg-[#2b2b30] w-full py-3  rounded  transition-all duration-75 ease-linear"
                >
                    send password reset link
                </button>
            </form>
        </div>
    </div>

    const signUpHideContent = <div className="md:w-[50%] w-full flex flex-col md:m-0 mt-3 items-center justify-center text-center">
        <div className="md:w-[70%] w-full text-center">
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
                    className="bg-[#5c5c6b]  text-white hover:bg-[#2b2b30] w-full py-3  rounded  transition-all duration-75 ease-linear"
                >
                    Verify
                </button>
            </form>
        </div>
    </div>




    const submitHandler = props.signUp ? signUpSubmitHandler : signInSubmitHandler

    return <div className="flex flex-col md:flex-row">
        <ToastContainer />
        <div className="md:w-[50%] w-full md:m-0 mx-auto mb-5 flex items-center justify-center md:block">
            <Image
                src={authImage}
                className="md:w-full w-[80%]"
            />
        </div>
        {!hideSign ? <div className="md:w-[50%] w-full flex flex-col items-center justify-center">
            <button
                className="bg-[#4285f4] hover:bg-[#1d6ae5] md:w-[70%] w-full py-2  rounded flex items-center justify-center transition-all duration-75 ease-linear"
                onClick={handleClick}
            >
                <Image
                    src={googleImage}
                    className="mr-3 rounded md:w-[2rem] sm:w-[1.8rem] w-[1.5rem]"
                />
                <p className="text-lg  text-white ">continue with Google</p>
            </button>
            <div className="flex items-center mt-4 md:w-[70%] w-full">
                <div className="bg-gray-300 w-[48%] h-[1px]" />
                <h1 className="text-gray-400 mx-2">OR</h1>
                <div className="bg-gray-300 w-[48%] h-[1px]" />
            </div>
            <div className="md:w-[70%] w-full mt-4">
                <form className="" onSubmit={submitHandler}>
                    <label className="text-lg text-left">Email</label>
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
                    <label className="text-lg text-left ">{!props.signUp ? "Password" : "set password"}</label>
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
                    <button
                        type="submit"
                        className="border border-violet-500 text-lg bg-violet-500 hover:bg-violet-600 text-white  mt-4 w-full py-3 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
                    >
                        {props.signUp ? "sign up" : "sign in"}
                    </button>
                    {!props.signUp && <p
                        className="mt-3 text-center cursor-pointer underline"
                        onClick={() => setHideSign(true)}
                    >
                        forgot password
                    </p>}
                </form>
                <p className="text-sm text-gray-800 mt-4">By continuing, you agree to the Terms of use and Privacy Policy of Peak Health Technologies.
                </p>
            </div>
        </div> :
            !props.signUp ? signInHideContent : signUpHideContent
        }
    </div>


}
export default Auth