import React from 'react'
import error from "../assets/404.png"

const Error = () => {
    return (
        <div className='flex flex-col h-[100vh] justify-center items-center font-bold text-3xl text-white'>
            <p>
                Error - 404 Page Not found

            </p>
            <img src={error} width={300}></img>
        </div>
    )
}

export default Error