import React from 'react'
import AddAdmin from './AddAdmin';
import EmployeeSubInfo from './EmployeeSubInfo';
import HotelBooking from './HotelBooking';

const Dashboard = () => {
    

    return (
        <>
            <HotelBooking />
            <EmployeeSubInfo />
            <AddAdmin />
        </>
    )
}

export default Dashboard