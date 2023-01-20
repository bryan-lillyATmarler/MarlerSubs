import React, { useEffect, useState, useContext } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { useBoolean } from '@fluentui/react-hooks';
import { DatePicker } from '@fluentui/react';
import { FcHighPriority, FcCheckmark } from "react-icons/fc";
import { TeamsFxContext } from "../Context";

const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
};
const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'When will you checkout?',
};

const BookedHotels = ({userName}) => {
    const { themeString } = useContext(TeamsFxContext);

    const [employeeHotels, setEmployeeHotels] = useState([]);
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [hotel, setHotel] = useState();
    const [success, setSuccess] = useState('');
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

    let url = 'https://marler-api.herokuapp.com/api/v1';
    
    useEffect(() => {
        fetch(`${url}/hotels?user=${userName}`, {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((data) => {
            data.data.forEach(element => {
                element.checkOut = getCheckOutDate(element.checkIn, element.numNights)
            });
            setEmployeeHotels(data.data);
        });
        //eslint-disable-next-line
    }, [userName]);

    const getCheckOutDate = (date, numNights) => {
        let checkOutDate = new Date(date);

        checkOutDate.setDate(checkOutDate.getDate() + numNights);

        return checkOutDate
    }

    const submitCheckOutEarly = () => {
        let checkedOutDate = new Date(checkOutDate);

        let checkedOutEarly = true;
        if(hotel.checkOut === checkedOutDate || hotel.checkOut < checkedOutDate) {
            checkedOutEarly = false
        }

        let reqBody = {
            checkedOutEarly,
            checkedOut: checkedOutDate
        }

        fetch(`${url}/hotels/${hotel._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data)
            if(data.success){
                setSuccess('success');
                let newData = [...employeeHotels];
                const index = newData.map(e => e._id).indexOf(hotel._id);
                newData[index] = data.data;
                setEmployeeHotels(newData);
            } else {
                setSuccess('fail');
            }
            setTimeout(() => {
                toggleHideDialog();
                setSuccess('');
                setCheckOutDate(new Date());
            }, 2000);
        })
    }

    const handleDateChange = (value) => {
        setCheckOutDate(value);
    }

    const handleCheckOutEarly = (hotel) => {
        setHotel(hotel);
        toggleHideDialog();
    }

    const pastCheckOut = (checkOut) => {
        if(new Date() <= new Date(checkOut)){
            return false;
        }

        return true;
    }

  return (
    <>
    <div className={`w-full border border-black p-5 ${themeString === 'dark' ? 'text-black': ''}`}>
        <div className='w-full flex mb-5'>
            <h1 className={`ml-2 m-auto ${themeString === 'dark' ? 'text-white' : ''}`}>Current Booked Hotels</h1>
        </div>
          {employeeHotels.map((hotel) => {
              return (
                  <>
                      <div className='w-full border p-5 border-black bg-slate-200 mb-5 rounded-md md:grid md:grid-cols-4'>
                          <div className='md:col-span-3 w-full'>
                              <div className='md:grid md:grid-cols-2'>
                                  <div className='md:grid-span-1'>
                                      <div className='mb-5 md:grid md:grid-cols-2'>
                                          <div className='md:col-span-1'><h2 className='text-xl'>Hotel: </h2></div>
                                          <div className='md:col-span-1'><span className='font-bold text-xl'>{hotel.hotelName}</span></div>
                                      </div>
                                      <div className='mb-5 md:grid md:grid-cols-2'>
                                          <div className='md:col-span-1'><h2 className='text-xl'>Town: </h2></div>
                                          <div className='md:col-span-1'><span className='font-bold text-xl'>{hotel.town}</span></div>
                                      </div>
                                      <div className='mb-5 md:grid md:grid-cols-2'>
                                          <div className='md:col-span-1'><h2 className='text-xl'>Number of Nights: </h2></div>
                                          <div className='md:col-span-1'><span className='font-bold text-xl'>{hotel.numNights}</span></div>
                                      </div>
                                      
                                  </div>
                                  <div className='md:grid-span-1'>
                                      <div className='mb-5 md:grid md:grid-cols-2'>
                                          <div className='md:col-span-1'><h2 className='text-xl'>Check in Date:</h2></div>
                                          <div className='md:col-span-1'><span className='font-bold text-xl'>{new Date(hotel.checkIn).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span></div>
                                      </div>
                                      <div className='mb-5 md:grid md:grid-cols-2'>
                                          <div className='md:col-span-1'><h2 className='text-xl'>Check Out Date:</h2></div>
                                          <div className='md:col-span-1'><span className='font-bold text-xl'>{new Date(hotel.checkOut).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span></div>
                                      </div>
                                  </div>
                              </div>

                          </div>
                          <div className="md:col-span-1 w-full m-auto flex">
                              {(hotel.checkedOutEarly || pastCheckOut(hotel.checkOut)) &&
                                  <div className="border border-black px-10 py-3 rounded-md m-auto bg-red-300 text-xl text-center">
                                      Checked Out
                                  </div>
                              }
                              {(!hotel.checkedOutEarly && !pastCheckOut(hotel.checkOut)) &&
                                  <button onClick={() => handleCheckOutEarly(hotel)} className="border border-black px-10 py-3 rounded-md m-auto bg-blue-100 text-xl hover:bg-blue-300">Check Out</button>
                              }
                              { }
                          </div>
                      </div>

                  </>
              )
          })}
        <Dialog
                hidden={hideDialog}
                onDismiss={toggleHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modelProps}
            >
                <div className='mb-5'>
                    <DatePicker 
                        label='Select Check Out Date'
                        value={checkOutDate}
                        onSelectDate={handleDateChange}
                    />
                </div>
                <div className='flex'>
                    {success === 'success' &&
                        <div className='m-auto'>
                            <FcCheckmark className='m-auto' size={25} />
                            <h3 className='m-auto'>Success</h3>
                        </div>
                    }
                    {success === 'fail' &&
                        <div className='m-auto'>
                            <FcHighPriority className='m-auto' size={25} />
                            <h3 className='m-auto'>A Problem Occured - Try Again</h3>
                        </div>
                    }
                </div>
                <DialogFooter>
                    <div className='grid grid-cols-2'>
                        {/* <button onClick={handleDelete} className="col-span-2 mb-10 border border-black px-10 rounded-md m-auto bg-red-300 text-lg hover:bg-blue-300">Delete Sub</button> */}
                        <button onClick={submitCheckOutEarly} className="col-span-1 mr-5 border border-black px-10 rounded-md m-auto bg-blue-100 text-lg hover:bg-blue-300">Submit</button>
                        <button onClick={toggleHideDialog} className="col-span-1 border border-black px-10 rounded-md m-auto bg-blue-100 text-lg hover:bg-blue-300">Cancel</button>           
                    </div>
                </DialogFooter>
            </Dialog>
            </div>
    </>
  )
}

export default BookedHotels