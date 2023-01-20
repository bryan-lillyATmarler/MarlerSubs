import React from 'react'
import { FcHighPriority } from "react-icons/fc";


const SubmitFail = () => {
    return (
        <>
            <div className='flex'>
                <div className='m-auto'>
                    <FcHighPriority className="my-auto" size={35} />
                </div>

                <div className='m-auto'>
                    <h2 className="my-auto pl-5 text-lg font-bold">An Error Occured - Make Sure All Fields Are Correct and Try Again</h2>
                </div>
            </div>
        </>
    )
}

export default SubmitFail