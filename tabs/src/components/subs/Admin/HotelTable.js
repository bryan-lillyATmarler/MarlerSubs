import React, { useState } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { useBoolean } from '@fluentui/react-hooks';

const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Clear this hotel entry?',
};

const HotelTable = ({hotelData, deleteHotel}) => {
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
    const [hotelID, setHotelID] = useState('')

    const handleClearHotel = (value) => {
        toggleHideDialog();
        setHotelID(value)
    }

    const handleDelete = () => {
        deleteHotel(hotelID);
        toggleHideDialog();
    }


    return (
        <>

            <div className="mb-5 ml-5">
                <h3 className="text-2xl">Current Booked Hotels</h3>
            </div>

            <div className='p-5'>
                <table className="table-fixed w-full bg-white border border-slate-400">
                    <thead>
                        <tr>
                            <th className="border border-slate-400">Employee Name</th>
                            <th className="border border-slate-400">Check-In Date</th>
                            <th className="border border-slate-400">Check out Date</th>
                            <th className="border border-slate-400">Num of Nights</th>
                            <th className="border border-slate-400">Rate per Night</th>
                            <th className="border border-slate-400">Hotel</th>
                            <th className="border border-slate-400">Town</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                      hotelData.map((hotel) => {
                          return (
                              <tr className={`cursor-pointer ${hotel.checkedOutEarly ? 'bg-red-300' : ''}`} key={hotel._id} onClick={() => handleClearHotel(hotel._id)}>
                                  <td className="border border-slate-400 text-center">{hotel.employee}</td>
                                  <td className="border border-slate-400 text-center">{new Date(hotel.checkIn).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                  <td className="border border-slate-400 text-center">{hotel.checkedOut ? new Date(hotel.checkedOut).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : ''}</td>
                                  <td className="border border-slate-400 text-center">{hotel.numNights}</td>
                                  <td className="border border-slate-400 text-center">${hotel.rate}</td>
                                  <td className="border border-slate-400 text-center">{hotel.hotelName}</td>
                                  <td className="border border-slate-400 text-center">{hotel.town}</td>
                              </tr>
                          )
                      })
                  }
                    </tbody>
                </table>
            </div>
            <Dialog
                hidden={hideDialog}
                onDismiss={toggleHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modelProps}
            >
                <DialogFooter>
                    <div className='grid grid-cols-2'>
                        <button onClick={handleDelete} className="col-span-2 mb-10 border border-black px-10 rounded-md m-auto bg-red-300 text-lg hover:bg-blue-300">Clear Hotel Entry</button>
                        <button onClick={toggleHideDialog} className="col-span-2 border border-black px-10 rounded-md m-auto bg-blue-100 text-lg hover:bg-blue-300">Cancel</button>
                    </div>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default HotelTable