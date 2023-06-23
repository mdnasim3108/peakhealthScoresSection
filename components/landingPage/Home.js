import { useState, useContext,useEffect } from 'react';
import Image from 'next/image';
import logoImg from "../../public/phLogo.png"
import authContext from './contextStrore/authContext';
import logoText from "../../public/phLogoText.png"
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
        <div>
            <div className="fixed top-0 sm:w-[80%] w-full z-10 lg:py-3  bg-white" >
                <div className="   px-4 sm:px-6 lg:px-8 " >
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center justify-between w-full">

                            <div className="md:relative flex items-center justify-between">
                                <Image
                                    src={logoImg}
                                    className="w-[3rem]  "
                                />

                                <span className="text-xl mr-1  text-[#ea7f17] font-bold font-rajdhani">
                                    Stress
                                </span>
                                <span className="text-xl mr-1  text-[#4855dc] font-bold font-rajdhani">
                                    Sense
                                </span>
                                <span className="text-xl  mr-1  text-[#4855dc] font-bold font-rajdhani">
                                    AI
                                </span>
                            </div>

                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <a href="#home" className=" hover:text-violet-500 text-gray-500 transition-all duration-150 ease-linear px-3 py-2 rounded-md text-lg font-medium">Home</a>
                                    <a href="#features" className=" hover:text-violet-500 text-gray-500 transition-all duration-150 ease-linear  px-3 py-2 rounded-md text-lg font-medium">Features</a>
                                    <a href="#test" className=" hover:text-violet-500 text-gray-500 transition-all duration-150 ease-linear  px-3 py-2 rounded-md text-lg font-medium">Testimonials</a>
                                </div>
                            </div>

                            <button
                                className="border-2 md:block hidden  tracking-wide text-lg   border-[#3F4FDB] text-[#3F4FDB] hover:text-white  hover:bg-[#3F4FDB]  font-bold px-2 pb-2 rounded-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                                onClick={() => {
                                    authState.change({ showAuth: true, signIn: true })}}
                            >
                                sign in
                            </button>

                        </div>

                        <div className="md:hidden">
                            <button
                                type="button"
                                className="text-gray-700 focus:outline-none "
                                onClick={toggleMobileMenu}
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={`md:hidden ${isMobileMenuOpen ? '' : 'hidden'}`}>
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3  bg-gray-200">
                            <a href="#home" onClick={toggleMobileMenu} className="text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Home</a>
                            <a href="#features" onClick={toggleMobileMenu} className="text-gray-600  block px-3 py-2 rounded-md text-base font-medium">Features</a>
                            <a href="#test" onClick={toggleMobileMenu} className="text-gray-600  block px-3 py-2 rounded-md text-base font-medium">Testimonials</a>
                            <a onClick={() =>{
                                scrollToTop()
                                authState.change({ showAuth: true, signIn: true })}} className="text-gray-600  block px-3 py-2 rounded-md text-base font-medium">Sign In</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-7' id="home">
                <div className='flex flex-col items-center justify-center text-center w-full mt-10 sm:mt-20'>
                    <h1 className="font-bold  md:text-5xl text-2xl font-rajdhani  text-center">Take control of your work stress…</h1>
                    <p className='mdtext-2xl text-xl leading-loose'>
                        No more guessing or struggling to understand your stress levels. Quick and
                        easy actions allow you to take control of your stress levels and improve
                        your productivity. Don't let stress hold you back - try Stress Sense AI today.
                    </p>
                    <button
                        className=" border-[#3F4FDB] border-2 text-lg bg-[#3F4FDB] text-white mt-4 w-[40%] py-3 rounded-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                        onClick={props.check}
                    >
                        Try for Free
                    </button>
                </div>

                <div className='w-full flex sm:flex-row flex-col mt-[5rem]'>

                    <div className='sm:w-[50%] w-full'>
                        <h1 className="font-bold  md:text-4xl text-2xl  leading-loose">Measure your stress in just 1 minute</h1>
                        <p className='text-xl leading-loose mt-4'>
                            Don't let stress go unnoticed. With Ultrafast Voice
                            AI, you can measure your job stress level in just 1
                            minute using advanced vocal biomarker technology.
                            Take immediate action to learn about your stress
                            levels.
                        </p>
                        <div className='w-full text-center'>

                            <button
                                className=" border-[#3F4FDB] px-3 border-2 text-lg bg-[#3F4FDB] text-white mt-4 sm:w-[40%] py-3 rounded-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                                onClick={props.check}
                            >
                                Discover Your Stress Level
                            </button>
                        </div>
                    </div>

                    <div className='sm:w-[50%] w-full h-full'>

                    </div>



                </div>

                <div className='w-full flex sm:flex-row flex-col mt-[5rem]' id="features">
                    <div className='sm:w-[50%]  h-full'>

                    </div>
                    <div className='sm:w-[50%] w-full'>
                        <h1 className="font-bold  md:text-4xl text-2xl leading-l">Unlock personal growth with deep
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
                                className=" border-[#3F4FDB] px-3 border-2 text-lg bg-[#3F4FDB] text-white mt-4 sm:w-[40%] py-3 rounded-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                                onClick={props.check}
                            >
                                Unlock insights now                        </button>
                        </div>

                    </div>
                </div>

                <div className='w-full flex sm:flex-row flex-col mt-[5rem]' id="test">
                    <div className='sm:w-[60%] w-full'>
                        <h1 className="font-bold  md:text-4xl text-2xl  leading-[3rem]">Relieve stress with personalized videos
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
                                className=" border-[#3F4FDB] mx-auto border-2 text-lg bg-[#3F4FDB] text-white mt-4 sm:w-[40%] px-3 py-3 rounded-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                                onClick={props.check}
                            >
                                Try now
                            </button>
                        </div>

                    </div>
                    <div className='sm:w-[30%] w-full  h-full'>

                    </div>



                </div>

            </div>

            <div className='bg-gray-300 flex justify-between sm:flex-row flex-col mt-10 px-10 py-20'>
                <div className='flex items-start justify-start'>
                    <div className='mb-2 mr-4'>
                        <Image
                            src={logoText}
                            className="w-[3rem]"
                        />
                    </div>

                    <div className='flex-col'>
                        <p className='text-lg text-gray-600 font-bold'>Peak Health Technologies</p>
                        <p className='text-lg text-gray-600 mt-3'>© 2023 All rights reserved</p>
                    </div>
                </div>

                <div className='mt-4'>
                    <p className='text-gray-600 mt-3'>Privacy Policy</p>
                    <p className='text-gray-600 mt-3'>Terms of Use</p>
                    <p className='text-gray-600 mt-3'>Contact Us</p>
                </div>

            </div>
        </div>

    );
};

export default home;


