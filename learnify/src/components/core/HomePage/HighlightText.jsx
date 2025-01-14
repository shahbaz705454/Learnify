import React from 'react'

const HighlightText = ({ text }) => {
    return (
        <span className='font-bold bg-gradient-to-br from-[#ffed88] to-[#a56c03] text-transparent bg-clip-text'>
            {text}
        </span>
    )
}

export default HighlightText