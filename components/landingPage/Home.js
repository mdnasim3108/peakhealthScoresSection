import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import logoImg from "../../public/phLogo.png"
import authContext from './contextStrore/authContext';
import logoText from "../../public/phLogoText.png"
import mobileBgImage from "../../public/mobileBgImage.jpg"
import heroSmallImage from "../../public/heroImageSmall.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
const home = (props) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const authState = useContext(authContext)
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    const scrollToTop = () => {
        if (window) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };
    useEffect(() => {
        scrollToTop()
    }, []);

    return (
        <div className={`w-full ${isMobileMenuOpen && "h-screen "}`}>

            <div className="fixed top-0  w-full  lg:py-1  bg-white border-gray-400 z-10 lg:px-5 shadow-lg" >

                <div className=" " >
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center justify-between w-full">

                            <div className="md:relative flex pl-4 lg:p-0 items-center justify-between">
                                <Image
                                    src={logoImg}
                                    className="w-[3rem]"
                                />

                                <span className="text-[30px] mr-1  text-[#ea7f17] font-bold font-rajdhani">
                                    Stress
                                </span>
                                <span className="text-[30px] mr-1  text-[#4855dc] font-bold font-rajdhani">
                                    Sense
                                </span>
                                <span className="text-[30px]  mr-1  text-[#4855dc] font-bold font-rajdhani">
                                    AI
                                </span>
                            </div>

                            <div className="hidden lg:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <a href="#home" className=" hover:text-violet-500 text-gray-500 transition-all duration-150 ease-linear px-3 py-2 rounded-md text-lg font-medium">Home</a>
                                    <a href="#features" className=" hover:text-violet-500 text-gray-500 transition-all duration-150 ease-linear  px-3 py-2 rounded-md text-lg font-medium">Features</a>
                                    <a href="#test" className=" hover:text-violet-500 text-gray-500 transition-all duration-150 ease-linear  px-3 py-2 rounded-md text-lg font-medium">Testimonials</a>
                                </div>
                            </div>

                            <button
                                className="border-2 lg:block hidden  tracking-wide text-lg py-2   border-[#3F4FDB] text-[#3F4FDB] hover:text-white  hover:bg-[#3F4FDB]  font-bold px-[20px] w-max  rounded-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                                onClick={() => {
                                    authState.change({ showAuth: true, signIn: true })
                                }}
                            >
                                Sign in
                            </button>

                        </div>

                        <div className={`lg:hidden pr-4 lg:p-0`}>
                            <button
                                type="button"
                                className="text-gray-700 focus:outline-none "
                                onClick={toggleMobileMenu}
                            >
                                {!isMobileMenuOpen ? <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                                    :
                                    <FontAwesomeIcon icon={faClose} className='text-2xl' />
                                }
                            </button>
                        </div>
                    </div>


                    <div className={`w-full flex lg:hidden justify-end z-20 box-border`}>
                        <div className={`nav-fade-in pt-2 pb-3 space-y-1 px-auto box-border bg-white w-[50%] fixed h-[100vh] ${isMobileMenuOpen ? "right-0" : "right-[-999px]"} transition-all duration-[400ms] ease-in-out`}>
                            <a href="#home" onClick={toggleMobileMenu} className="text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Home</a>
                            <a href="#features" onClick={toggleMobileMenu} className="text-gray-600  block px-3 py-2 rounded-md text-base font-medium">Features</a>
                            <a href="#test" onClick={toggleMobileMenu} className="text-gray-600  block px-3 py-2 rounded-md text-base font-medium">Testimonials</a>
                            <a onClick={() => {
                                scrollToTop()
                                authState.change({ showAuth: true, signIn: true })
                            }} className="text-gray-600  block px-3 py-2 rounded-md text-base font-medium">Sign In</a>
                        </div>
                    </div>


                </div>
            </div>



            <div className='sm:pt-7' id="home">

                {isMobileMenuOpen && <div className=" w-full nav-fade-in absolute lg:h-[100vh] h-[400vh] bg-black/75"
                    onClick={() => { setMobileMenuOpen(false) }}
                ></div>}

                <div className="flex h-screen bg-image  sm:mt-0 mt-10 rounded  flex-col-reverse sm:w-full lg:flex-row justify-evenly items-center">

                    <Image
                        src={heroSmallImage}
                        className='h-[100vh] w-[50%] lg:block hidden'
                    />
                    <div className="flex sm:w-[50%] w-full lg:m-0 sm:my-auto flex-col items-center justify-start bg-[#eff2f6] sm:bg-transparent">

                        <Image
                            src={mobileBgImage}
                            className='w-full rounded block sm:hidden'
                        />





                        <div>
                            <span className="sm:text-[76px] text-[40px] sm:mr-5  text-[#ea7f17] font-bold font-rajdhani">
                                Stress
                            </span>
                            <span className="sm:text-[76px] text-[40px] mr-5  text-[#4855dc] font-bold font-rajdhani">
                                Sense
                            </span>
                            <span className="sm:text-[76px] text-[40px]  mr-5  text-[#4855dc] font-bold font-rajdhani">
                                AI
                            </span>
                        </div>

                        <p className="font-[montserrat] p-2 sm:p-0 text-[36px] leading-tight  mb-5 text-center sm:w-[90%]">
                            Your personal AI assistant
                            to measure, understand,
                            and conquer stress.
                        </p>
                        <button
                            id="startingButton"
                            className=" border border-[#3F4FDB] tracking-wide text-lg hover:bg-[#3F4FDB] bg-[#3F4FDB] text-white hover:text-white   font-bold sm:px-8 sm:py-3 px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            onClick={props.check}
                        >
                            Start My 1 Min Stress Check
                        </button>
                        <p className="font-sans text-lg mb-5 text-center text-gray-500 mt-3">
                            Free | No signup required
                        </p>
                    </div>
                </div>

                <div className='flex p-7  flex-col items-center justify-center text-center w-full mt-10 sm:mt-10' id="features">
                    <div className="h-[15vh] w-[6rem]">

                    </div>
                    <h1 className="font-bold  lg:text-5xl text-2xl font-rajdhani  text-center">Take control of your work stress…</h1>
                    <p className='lg:text-2xl text-xl  leading-loose mt-5'>
                        No more guessing or struggling to understand your stress levels. Quick and
                        easy actions allow you to take control of your stress levels and improve
                        your productivity. Don't let stress hold you back - try Stress Sense AI today.
                    </p>
                    <button
                        className=" border-[#3F4FDB] font-bold border-2 text-lg bg-[#3F4FDB] text-white mt-4 w-max py-3 px-[20px] rounded-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                        onClick={props.check}
                    >
                        Try for Free
                    </button>
                </div>

                <div className='w-full p-7  flex sm:flex-row flex-col mt-[5rem]'>

                    <div className='sm:w-[50%] w-full'>
                        <h1 className="font-bold  md:text-4xl text-2xl font-rajdhani  leading-loose">Measure your stress in just 1 minute</h1>
                        <p className='text-xl leading-loose mt-4'>
                            Don't let stress go unnoticed. With Ultrafast Voice
                            AI, you can measure your job stress level in just 1
                            minute using advanced vocal biomarker technology.
                            Take immediate action to learn about your stress
                            levels.
                        </p>
                        <div className='w-full text-center'>

                            <button
                                className=" border-[#3F4FDB] px-[20px] border-2 font-bold text-lg bg-[#3F4FDB] text-white mt-4 mr-4 sm:w-max py-3 rounded-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                                onClick={props.check}
                            >
                                Discover Your Stress Level
                            </button>
                        </div>
                    </div>

                    <div className='sm:w-[50%] w-full h-full'>

                    </div>



                </div>

                <div className='w-full flex sm:flex-row flex-col mt-[5rem] p-7'>
                    <div className='sm:w-[50%]  h-full'>

                    </div>
                    <div className='sm:w-[50%] w-full'>
                        <h1 className="font-bold  md:text-4xl text-2xl font-rajdhani leading-l">Unlock personal growth with deep
                            insights</h1>
                        <p className='text-xl leading-loose mt-4'>
                            Stress Sense AI goes beyond just measuring
                            your stress level. With Deep Sense Insights,
                            you can uncover the deeper meaning behind
                            your stress patterns and use them as a catalyst
                            for personal growth. Take control of your
                            well-being and thrive in both your personal
                            and professional life.
                        </p>

                        <div className='w-full text-center'>
                            <button
                                className=" border-[#3F4FDB] px-[20px] border-2 text-lg font-bold bg-[#3F4FDB] text-white mt-4 sm:w-max py-3 rounded-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                                onClick={props.check}
                            >
                                Unlock Insights Now                        </button>
                        </div>

                    </div>
                </div>

                <div className='w-full flex sm:flex-row flex-col mt-[5rem] p-7 ' id="test">
                    <div className='sm:w-[50%] w-full'>
                        <h1 className="font-bold  lg:text-4xl text-2xl font-rajdhani  leading-[3rem]">Relieve stress with personalized videos
                            designed just for you</h1>
                        <p className='text-xl leading-loose mt-4'>
                            Take control of your stress levels with
                            personalized and science-backed videos.
                            With the hyper-matching technology, you get
                            tailored content to help manage and reduce
                            stress. Don't let stress get the better of you -
                            start feeling better today.
                        </p>
                        <div className='w-full text-center'>

                            <button
                                className=" border-[#3F4FDB] mx-auto border-2 text-lg font-bold bg-[#3F4FDB] text-white mt-4 sm:w-max px-[20px] py-3 rounded-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                                onClick={props.check}
                            >
                                Try Now
                            </button>
                        </div>

                    </div>
                    <div className='sm:w-[30%] w-full  h-full'>

                    </div>



                </div>

            </div>

            <div className='bg-[#3d3f4b] flex justify-between sm:flex-row flex-col mt-10 px-10 py-20'>
                <div className='flex items-start justify-start'>

                    <div className='relative bottom-3 mr-4'>
                        <Image
                            src={logoText}
                            className="w-[6rem]"
                        />
                    </div>

                    <div className='flex-col'>
                        <p className='text-lg text-white font-bold'>Peak Health Technologies</p>
                        <p className='text-lg text-white mt-3'>© 2023 All rights reserved</p>
                    </div>
                </div>

                <div className='relative  top-[1rem] sm:top-[-1rem]'>
                    <p className='text-white mt-3'>Privacy Policy</p>
                    <p className='text-white mt-3'>Terms of Use</p>
                    <p className='text-white mt-3'>Contact Us</p>
                </div>

            </div>
        </div>

    );
};

export default home;


