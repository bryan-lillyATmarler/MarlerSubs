import React from 'react'
import { FcCheckmark } from "react-icons/fc";

const SubmitSuccess = (props) => {
    return (
        <>
            <div className='flex'>
                <div className='m-auto'>
                    <FcCheckmark className="my-auto" size={35} />
                </div>
                <div className='m-auto'>
                    <h2 className="my-auto pl-5 text-lg font-bold">Success</h2>
                </div>
            </div>
        </>
    )
}

export default SubmitSuccess