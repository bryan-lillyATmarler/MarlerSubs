import React from 'react'
import { FcCheckmark } from "react-icons/fc";

const SubmitSuccess = (props) => {
    return (
        <>
            <FcCheckmark className="my-auto" size={35} />
            <h2 className="my-auto pl-5 text-lg font-bold">Success</h2>
        </>
    )
}

export default SubmitSuccess