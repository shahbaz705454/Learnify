import React from 'react'
import Button from './Button'
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa";

const Codeblocks = ({ position, heading, subHeading, btn1, btn2, codeblock, backgroundGradient, codeColor }) => {
    return (
        <div className={`flex ${position} my-20 justify-between gap-10`}>

            {/* section 1 */}
            <div className='w-[50%] flex flex-col gap-8'>
                {heading}
                <div className='text-richblack-300 font-bold'>
                    {subHeading}
                </div>
                <div className='flex gap-7 mt-7'>
                    <Button active={btn1.active} linkto={btn1.linkto}>
                        <div className='flex gap-2 items-center'>
                            {btn1.bt1Text}
                            <FaArrowRight />

                        </div>
                    </Button>

                    <Button active={btn2.active} linkto={btn2.linkto}>

                        {btn2.btn2Text}

                    </Button>
                </div>

            </div>


        </div>
    )
}

export default Codeblocks