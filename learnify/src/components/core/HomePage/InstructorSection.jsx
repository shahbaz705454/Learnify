import React from 'react'
import instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import Button from './Button'
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-between gap-20 items-center mt-10 '>
            <div className='lg:w-[50%]' >
                <img src={instructor} alt='instructorimg' className='shadow-yellow-200 shadow-[-15px_-15px_5px]'></img>

            </div>
            <div className='lg:w-[50%] flex flex-col gap-10'>
                <div className='text-4xl font-semibold flex flex-col'>
                    Beacome an
                    <HighlightText text={" Instructor "}></HighlightText>

                </div>

                <p className='font-medium text-[16px] w-[80%] text-richblack-300'>Instructors from around the world teach millions of students on
                    StudyNotion. We provide the tools and skills to teach what you love.
                </p>

           <div className='w-fit'>
                <Button active={true} linkto={"/signup"}>
                    <div className='flex flex-row items-center gap-2 justify-center '>Start Teaching today
                        <FaArrowRight></FaArrowRight>
                    </div>
                </Button>
                </div>


            </div>




        </div>

    )
}

export default InstructorSection