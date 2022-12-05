import React, { useEffect, useState } from 'react'
import { Dropdown } from '@fluentui/react/lib/Dropdown';

const Dashboard = () => {
    const [employeeNames, setEmployeeNames] = useState([]);
    const [employeeData, setEmployeeData] = useState([])
    const [isFetching, setIsFetching] = useState(true);

    const url = 'https://marler-api.herokuapp.com/api/v1/subs'

    useEffect(() => {
        setIsFetching(true);
        fetch(`${url}/admin/employees`, {
            method: 'GET',
            // mode: 'no-cors'
             
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
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
            setEmployeeData(data.data);
        });
    }

    const dropdownStyles = {
        dropdown: { width: 300, margin: 'auto' }
    }

    return (
        <>
            {!isFetching &&
                <div className='w-full text-center'>
                    <Dropdown
                        placeholder="Select employee"
                        label="Select Employee"
                        // defaultSelectedKeys={['apple', 'banana', 'grape']}
                        // multiSelect
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
                                        <tr key={index}>
                                            <td className="border border-slate-400 text-center">{new Date(sub.date).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                            <td className="border border-slate-400 text-center">{sub.subType}</td>
                                            <td className="border border-slate-400 text-center">{sub.hotel}</td>
                                            <td className="border border-slate-400 text-center">{sub.town}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default Dashboard