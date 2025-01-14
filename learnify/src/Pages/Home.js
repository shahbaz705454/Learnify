import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import Button from '../components/core/HomePage/Button';
import banner from "../assets/Images/banner.mp4"
import Codeblocks from '../components/core/HomePage/Codeblocks';

const Home = () => {
    return (
        <div className=''>
            {/* Section 1 */}
            <div className='relative mx-auto flex flex-col  w-11/12 items-center text-white justify-center'>
                <Link to={"/signUp"}>
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

                <div className='flex flex-row gap-7 mt-12 '>
                    <Button active={true}>
                        Learn More
                    </Button>

                    <Button>
                        Book a Demo
                    </Button>
                 


                </div>

                <div className=' my-14 shadow-[10px_-5px_50px_-5px] shadow-yellow-600 mx-3'>
                    <video muted
                    loop
                    autoPlay                    
                    className='shadow-[10px_10px_10px_#bf9b30]'>
                        <source src={banner} />

                    </video>

                </div>



                {/* code section 1 */}

                <div className='flex flex-col'>
                    
                    <div></div>
                </div>





            </div>




            {/* Section 2 */}

            {/* Section 3 */}

            {/* Footer */}



        </div>
    )
}

export default Home