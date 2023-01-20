import { TextField } from '@fluentui/react';
import { useData } from '@microsoft/teamsfx-react';
import React, { useState, useContext } from 'react';
import { TeamsFxContext } from "../../Context";
import SubmitFail from '../SubmitFail';
import SubmitSuccess from '../SubmitSuccess';

const AddAdmin = () => {
    const { themeString } = useContext(TeamsFxContext);

    const { teamsfx } = useContext(TeamsFxContext);
    const { loading, data, error } = useData(async () => {
      if (teamsfx) {
        const userInfo = await teamsfx.getUserInfo();
        return userInfo;
      }
    });
    const userName = (loading || error) ? "": data.displayName;

    const labelStyles = {
        wrapper: {
            selectors: {
                'label': {
                    color: `${themeString === 'dark' ? 'white' : 'black'}`
                }
            }
        }
    }

    const [adminName, setAdminName] = useState('');
    const [success, setSuccess] = useState('');

    const handleNameChange = (e) => {
        setAdminName(e.target.value);
    }

    const handleSubmit = () => {
        const url = `https://marler-api.herokuapp.com/api/v1/users`;

        let userData = {
            username: adminName,
            createdBy: userName,
            role: 'admin'
        }

        fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if(data.success){
                //success
                setSuccess('success');
            } else {
                //fail
                setSuccess('fail');
            }
            setAdminName('');
            setTimeout(() => {
                setSuccess('');
            }, 2000);
            
        });
    }

    return (
        <>
            <div className='mt-10 border-t-8'></div>
            <div className='mt-10 mb-10'>
                <h2 className='text-2xl pl-5'>Add an Adminstrator</h2>
            </div>

            <form>
                <div className='mx-5'>
                    <TextField
                        label="Enter New Adminstrator's Name"
                        styles={labelStyles}
                        onChange={handleNameChange}
                        value={adminName}
                    />
                </div>

                <div className="col-span-4 flex mt-5">
                    <button onClick={handleSubmit} className={`border border-black px-10 py-3 rounded-md m-auto bg-blue-100 text-xl hover:bg-blue-300 ${themeString === 'dark' ? 'text-black': ''}`}>Add Administrator</button>
                </div>
            </form>
            <div className='w-full flex'>
                {success === 'success' &&
                    <div  className='m-auto'>
                        <SubmitSuccess />
                    </div>
                }
                {success === 'fail' &&
                    <div  className='m-auto'>
                        <SubmitFail />
                    </div>

                }
            </div>
        </>
    )
}

export default AddAdmin