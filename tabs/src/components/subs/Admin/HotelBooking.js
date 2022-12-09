import { DatePicker, Dropdown, TextField } from '@fluentui/react'
import React, { useState } from 'react'
import HotelTable from './HotelTable';

const HotelBooking = () => {
    const [hotelEmployee, setHotelEmployee] = useState('');
    const [hotelCheckin, setHotelCheckin] = useState('');
    const [hotelHotel, setHotelHotel] = useState('');
    const [hotelTown, setHotelTown] = useState('');
    const [hotelNumberNights, setHotelNumberNights] = useState('');
    const [hotelRate, setHotelRate] = useState('');


    const handleEmployeeChange = (e, selectedOption) => {
        setHotelEmployee(selectedOption);
    }

    const handleCheckinChange = (value) => {
        setHotelCheckin(value);
    }

    const handleHotelChange = (e) => {
        setHotelHotel(e.target.value);
    }

    const handleTownChange = (e) => {
        setHotelTown(e.target.value);
    }

    const handleNumNightsChange = (e) => {
        setHotelNumberNights(e.target.value); 
    }

    const handleRateChange = (e) => {
        setHotelRate(e.target.value);
    }

    const handleHotelSubmit = (e) => {
        e.preventDefault();

        const hotelData = {
            employee: hotelEmployee,
            checkin: hotelCheckin,
            hotel: hotelHotel,
            town: hotelTown,
            nights: hotelNumberNights,
            rate: hotelRate
        }

        console.log(hotelData);
    }

  return (
    <div>
        <div className='ml-5'>
            <h1>Hotel Booking Information</h1>
        </div>

        <form>
            <div className='lg:grid lg:grid-cols-2'>
                {/* NAME OF PERSON */}
                <div className='m-5 col-span-1'>
                    <Dropdown 
                        label='Select Employee'
                    />
                </div>

                {/* CHECK IN Date */}
                <div className='m-5 col-span-1'>
                    <DatePicker 
                        label='Select Check-In Date'
                        allowTextInput
                        onSelectDate={handleCheckinChange}
                        placeholder='Select Check-In Date'
                        value={hotelCheckin}
                    />
                </div>

                {/* HOTEL */}
                <div className='m-5 col-span-1'>
                    <TextField 
                        label='Enter Hotel Name'
                        onChange={handleHotelChange}
                        value={hotelHotel}
                    />
                </div>

                {/* TOWN */}
                <div className='m-5 col-span-1'>
                    <TextField 
                        label='Enter Town Name'
                        onChange={handleTownChange}
                        value={hotelTown}
                    />
                </div>

                {/* NUMBER OF NIGHTS */}
                <div className='m-5 col-span-1'>
                    <TextField 
                        label='Enter Number of Nights'
                        onChange={handleNumNightsChange}
                        value={hotelNumberNights}
                    />
                </div>

                {/* RATE PER NIGHT */}
                <div className='m-5 col-span-1'>
                    <TextField 
                        label='Enter the Rate Per Night'
                        onChange={handleRateChange}
                        value={hotelRate}
                    />
                </div>

                <div className='m-5 col-span-2 flex'>
                    <button onClick={handleHotelSubmit} className="border border-black px-10 py-3 rounded-md m-auto bg-blue-100 text-xl hover:bg-blue-300">Submit Hotel Booking Information</button>
                </div>
            </div>
        </form>
    
        <HotelTable />
    </div>
  )
}

export default HotelBooking