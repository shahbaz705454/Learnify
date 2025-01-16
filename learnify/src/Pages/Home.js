import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import Button from '../components/core/HomePage/Button';
import banner from "../assets/Images/banner.mp4"
import Codeblocks from '../components/core/HomePage/Codeblocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearnignLanguageSection from '../components/core/HomePage/LearnignLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/Common/Footer';
import {toast} from "react-hot-toast"
const Home = () => {
    return (
        <div >
            {/* Section 1 */}
            <div className='relative mx-auto flex flex-col  w-11/12 items-center text-white justify-center'>
                <Link to={"/signUp"} >
                    <div className='group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
             transition-all duration-200 hover:scale-95 w-fit mt-16 p-1 drop-shadow-[0_1.01px_#FFD700]
             hover:drop-shadow-none '>

                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                        group-hover:bg-richblack-900'>
                            <p>Become A Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>

                </Link>


                <div className='text-center text-4xl font-semibold mt-7'>
                    Empower your Future Grouth with
                    <HighlightText text={" Coding Skills"} />
                </div>

                <div className='w-[90%] text-center text-lg text-richblack-300 font-bold mt-4'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth <br></br> of resources, including hands-on projects,
                    quizzes, and personalized feedback from instructors.
                </div>

                {/* /button  */}

                <div className='flex flex-row gap-7 mt-12 '>
                    <Button active={true} linkto={"/signup"}>
                        Learn More
                    </Button>

                    <Button active={false} linkto={"/login"}>
                        Book a Demo
                    </Button>



                </div>

                {/* /video  */}

                <div className=' my-14 shadow-[10px_-5px_50px_-5px] shadow-yellow-600 mx-8'>
                    <video muted
                        loop
                        autoPlay
                        className='shadow-[10px_10px_10px_#bf9b30]'>
                        <source src={banner} />

                    </video>

                </div>



                {/* code section 1 */}

                <div className='flex flex-col mx-8'>

                    <Codeblocks position={"lg:flex-row "}
                        heading={
                            <div className="text-4xl font-semibold">Unlock Your
                                <HighlightText text={" coding potential "} />
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        btn1={
                            {
                                btnText: "Try it yourself",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        btn2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false,
                            }
                        }

                        codeColor={"text-yellow-25"}
                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                        backgroundGradient={<div className="codeblock1 absolute"></div>}

                    />
                </div>



                {/* Code Section 2 */}
                <div className='flex flex-col mx-8'>
                    <Codeblocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                                Start
                                <HighlightText text={" coding in seconds "} />
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        btn1={{
                            btnText: "Continue Lesson",
                            link: "/signup",
                            active: true,
                        }}
                        btn2={{
                            btnText: "Learn More",
                            link: "/signup",
                            active: false,
                        }}
                        codeColor={"text-white"}
                        codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        backgroundGradient={<div className="codeblock2 absolute"></div>}
                    />
                </div>




                <ExploreMore></ExploreMore>
            </div>




            {/* Section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                {/* sub section 1 */}

                <div className='homepage-bg h-[320px]'>
                    <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8'>
                        <div className="lg:h-[150px] ">

                        </div>
                        <div className="flex flex-row gap-7 text-white lg:mt-8">
                            <Button active={true} linkto={"/signup"}>
                                <div className="flex items-center gap-2">
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </Button>
                            <Button active={false} linkto={"/login"}>
                                Learn More
                            </Button>
                        </div>

                    </div>

                </div>

                <div className='mx-auto mt-14 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8'>
                    <div className='mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0'>
                        <div className='text-4xl font-semibold lg:w-[45%] '>
                            Get the Skills you need for a
                            <HighlightText text={" job\n that is in demand"}></HighlightText>
                        </div>
                        <div className='flex flex-col items-start gap-10 lg:w-[40%]'>
                            <div className='text-[16px]'>
                                The modern StudyNotion is the dictates its own terms. Today, to
                                be a competitive specialist requires more than professional skills.

                            </div>

                            <Button active={true} linkto={"/login"}>Learn More</Button>
                        </div>

                    </div>

                    <TimelineSection></TimelineSection>
                    <LearnignLanguageSection></LearnignLanguageSection>

                </div>


            </div>




            {/* Section 3 */}
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-center gap-8 first-letter
            bg-richblack-900 text-white'>
                <InstructorSection></InstructorSection>
                <h2>Reviews from other learners</h2>

            </div>

            {/* Footer */}

            <Footer></Footer>



        </div>
    )
}

export default Home