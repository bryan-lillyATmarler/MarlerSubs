import { DatePicker, TextField } from '@fluentui/react'
import React, { useState, useEffect } from 'react'
import SubmitFail from '../SubmitFail';
import SubmitSuccess from '../SubmitSuccess';
import HotelTable from './HotelTable';
import { useContext } from "react";
import { TeamsFxContext } from "../../Context";

const HotelBooking = () => {

    const [hotelData, setHotelData] = useState([]);
    const [success, setSuccess] = useState('');

    let url = 'https://marler-api.herokuapp.com/api/v1'

    useEffect(() => {
        

        fetch(`${url}/hotels`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data);
                setHotelData(data.data)
            })
            //eslint-disable-next-line
    }, []);


    const [hotelEmployee, setHotelEmployee] = useState('');
    const [hotelCheckin, setHotelCheckin] = useState('');
    const [hotelHotel, setHotelHotel] = useState('');
    const [hotelTown, setHotelTown] = useState('');
    const [hotelNumberNights, setHotelNumberNights] = useState('');
    const [hotelRate, setHotelRate] = useState('');


    const handleEmployeeChange = (e) => {
        setHotelEmployee(e.target.value);
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

        const newHotelData = {
            employee: hotelEmployee,
            checkIn: hotelCheckin,
            hotelName: hotelHotel,
            town: hotelTown,
            numNights: hotelNumberNights,
            rate: hotelRate
        }

        fetch(`${url}/hotels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newHotelData)
        })
            .then(res => res.json())
            .then((data) => {
                if(data.success){
                    setSuccess('success');
                    let newData = [...hotelData];
                    newData.push(data.data);
                    setHotelData(newData);
                    setHotelEmployee('');
                    setHotelCheckin('');
                    setHotelNumberNights('');
                    setHotelHotel('');
                    setHotelRate('');
                    setHotelTown('');
                } else {
                    setSuccess('failed');
                }
                setTimeout(() => {
                    setSuccess('');
                }, 2000);
            })
    }

    const deleteHotel = (hotelID) => {
        fetch(`${url}/hotels/${hotelID}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then((data) => {
                let newData = hotelData.filter((obj) => {
                    return obj._id !== hotelID
                })
                setHotelData(newData);
            })
    }

    const { themeString } = useContext(TeamsFxContext);

    const labelStyles = {
        wrapper: {
            selectors: {
                'label': {
                    color: `${themeString === 'dark' ? 'white' : 'black'}`
                }
            }
        }
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
                      <TextField
                            styles={labelStyles}
                          label="Enter Employee Name"
                          onChange={handleEmployeeChange}
                          value={hotelEmployee}
                      />
                  </div>

                  {/* CHECK IN Date */}
                  <div className='m-5 col-span-1'>
                      <DatePicker
                          label='Select Check-In Date'
                          styles={labelStyles}
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
                          styles={labelStyles}
                          onChange={handleHotelChange}
                          value={hotelHotel}
                      />
                  </div>

                  {/* TOWN */}
                  <div className='m-5 col-span-1'>
                      <TextField
                          label='Enter Town Name'
                          styles={labelStyles}
                          onChange={handleTownChange}
                          value={hotelTown}
                      />
                  </div>

                  {/* NUMBER OF NIGHTS */}
                  <div className='m-5 col-span-1'>
                      <TextField
                          label='Enter Number of Nights'
                          styles={labelStyles}
                          onChange={handleNumNightsChange}
                          value={hotelNumberNights}
                      />
                  </div>

                  {/* RATE PER NIGHT */}
                  <div className='m-5 col-span-1'>
                      <TextField
                          label='Enter the Rate Per Night'
                          styles={labelStyles}
                          onChange={handleRateChange}
                          value={hotelRate}
                      />
                  </div>
                  <div className='m-5 col-span-2 flex'>
                      <button onClick={handleHotelSubmit} className="border border-black px-10 py-3 rounded-md m-auto bg-blue-100 text-xl hover:bg-blue-300">Submit Hotel Booking Information</button>
                  </div>
                  <div className="h-20 w-full flex justify-center col-span-2">
                      {success === 'success' &&
                          <SubmitSuccess className='m-auto' />
                      }
                      {success === 'failed' &&
                          <SubmitFail className='m-auto' />
                      }
                  </div>
              </div>
          </form>
    
        <HotelTable hotelData={hotelData} deleteHotel={deleteHotel} />
    </div>
  )
}

export default HotelBooking