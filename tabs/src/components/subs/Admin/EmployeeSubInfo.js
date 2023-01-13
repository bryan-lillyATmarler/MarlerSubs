import React, { useEffect, useState } from 'react'
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Checkbox } from '@fluentui/react';
import { AiOutlineCheck } from "react-icons/ai";

const EmployeeSubInfo = () => {
    const [employeeNames, setEmployeeNames] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [isChecked, setIsChecked] = useState([]);

    const checkChange = (value) => {
        //spread array
        let idArray = [...isChecked];
        // check if value is in the array
        if(idArray.includes(value)) {
            //is in the array -> remove from array
            let index = idArray.indexOf(value);
            idArray.splice(index, 1);
        } else {
            //not in array -> add to array
            idArray.push(value);
        }
        //set state
        setIsChecked(idArray);
    }

    const url = 'https://marler-api.herokuapp.com/api/v1/subs'

    useEffect(() => {
        setIsFetching(true);
        fetch(`${url}/admin/employees`, {
            method: 'GET',
            // mode: 'no-cors'
             
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setEmployeeNames(data.data)
        });
        setIsFetching(false)
    }, []);

    const handleDropdownChange = (e, selectedOption) => {
        fetchEmployeeData(selectedOption.text);
    }

    const fetchEmployeeData = (user = '*') => {
        fetch(`${url}/admin?user=${user}`, {
            method: 'GET',
            // mode: 'no-cors'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.data)
            setEmployeeData(data.data);
        });
    }

    const approvedUpdate = () => {
        let approvedIDs = [...isChecked];
        console.log(JSON.stringify(approvedIDs))
        fetch(`http://localhost:5000/api/v1/subs/admin/approve`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(approvedIDs)   
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        setIsChecked([]);
    }

    const dropdownStyles = {
        dropdown: { width: 300 }
    }

    return (
        <>
            <div className='ml-5 mt-10'>
                <h1>Check Logged Subs by Employee</h1>
            </div>

            {!isFetching &&
                <div className='w-full ml-5'>
                    <Dropdown
                        placeholder="Select employee"
                        label="Select Employee"
                        options={employeeNames}
                        styles={dropdownStyles}
                        onChange={handleDropdownChange}
                    />
                </div>
            }
            {employeeData.length !== 0 &&
                <div className='m-5'>
                    <div>
                        <h1>{employeeData[0].user}</h1>
                    </div>
                    <table className="table-fixed w-full bg-white border border-slate-400">
                        <thead>
                            <tr>
                                <th className='w-8 border border-slate-400'></th>
                                <th className="border border-slate-400">Date</th>
                                <th className="border border-slate-400">Sub Type</th>
                                <th className="border border-slate-400">Hotel</th>
                                <th className="border border-slate-400">Town</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employeeData.map((sub, index) => {
                                    return (
                                        <>
                                        
                                        <tr key={sub._id} className={`${isChecked.includes(sub._id) ? 'bg-slate-500' : ''}`}>
                                            <td className='border border-slate-400 text-center flex'>{sub.approved ? <AiOutlineCheck color='green' size={20} className='m-auto' /> : <Checkbox disabled={sub.approved} onChange={() => checkChange(sub._id)} className='m-auto' />}</td>
                                            <td className={`border border-slate-400 text-center `}>{new Date(sub.date).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                            <td className={`border border-slate-400 text-center `}>{sub.subType}</td>
                                            <td className={`border border-slate-400 text-center `}>{sub.hotel}</td>
                                            <td className={`border border-slate-400 text-center `}>{sub.town}</td>
                                        </tr>
                                        </>
                                    )
                                    
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
            {isChecked.length !== 0 &&
                <div className='m-5 col-span-2 flex'>
                    <button onClick={() => approvedUpdate()} className="border border-black px-10 py-3 rounded-md m-auto bg-blue-100 text-xl hover:bg-blue-300">Approve Subs</button>
                </div>
            }
        </>
    )
}

export default EmployeeSubInfo