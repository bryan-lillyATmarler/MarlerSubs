import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import React, { useState } from 'react'
import { useBoolean } from '@fluentui/react-hooks';
import { DatePicker, TextField } from '@fluentui/react';
import { FcCheckmark } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";

const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Edit Your Sub',
  };


const SubTable = (props) => {
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

    const [subDate, setSubDate] = useState('');
    const [subHotel, setSubHotel] = useState('');
    const [subTown, setSubTown] = useState('');
    const [subID, setSubID] = useState('');
    const [success, setSuccess] = useState('');

    const handleEditSub = (key, date, hotel, town) => {
        setSubDate(new Date(date));
        setSubHotel(hotel);
        setSubTown(town);
        setSubID(key);
        toggleHideDialog();
    }

    const handleDateChange = (value) => {
        setSubDate(value);
    }

    const handleHotelChange = (e) => {
        setSubHotel(e.target.value);
    }

    const handleTownChange = (e) => {
        setSubTown(e.target.value);
    }

    const url = 'https://marler-api.herokuapp.com/api/v1/subs';

    const handleSubmit = () => {
        const subData = {
            date: subDate,
            hotel: subHotel,
            town: subTown
        }

        fetch(`${url}/${subID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subData)
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setSuccess('success');
                setTimeout(() => {
                    setSuccess('');
                    toggleHideDialog();
                    props.setSubData([]);
                }, 2000);
            } else {
                setSuccess('fail');
            }
            
        });
    }

    const handleDelete = () => {
        fetch(`${url}/${subID}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setSuccess('success');
                setTimeout(() => {
                    setSuccess('');
                    toggleHideDialog();
                    props.setSubData([]);
                }, 2000);
            } else {
                setSuccess('fail');
            }
        });
    }

    return (
        <>
            <div className="mb-5">
                <h3 className="text-2xl">Your Current Logged Subs</h3>
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
                        props.data.map((sub) => {
                            return (
                                <tr key={sub._id} onClick={() => handleEditSub(sub._id, sub.date, sub.hotel, sub.town)} className='cursor-pointer'>
                                    <td className="border border-slate-400 text-center h-10">{new Date(sub.date).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                    <td className="border border-slate-400 text-center h-10">{sub.subType}</td>
                                    <td className="border border-slate-400 text-center h-10">{sub.hotel}</td>
                                    <td className="border border-slate-400 text-center h-10">{sub.town}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Dialog
                hidden={hideDialog}
                onDismiss={toggleHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modelProps}
            >
                <div className='mb-5'>
                    <DatePicker 
                        label='Select Date'
                        value={subDate}
                        onSelectDate={handleDateChange}
                    />
                </div>
                <div className='mb-5'>
                    <TextField 
                        label='Hotel Name'
                        value={subHotel}
                        onChange={handleHotelChange}
                    />
                </div>
                <div className='mb-5'>
                    <TextField 
                        label='Town Name'
                        value={subTown}
                        onChange={handleTownChange}
                    />
                </div>
                <div>
                    {success === 'success' &&
                        <div className='flex'>
                            <FcCheckmark size={25} />
                            <h3>Success</h3>
                        </div>
                    }
                    {success === 'fail' &&
                        <div className='flex'>
                            <FcHighPriority size={25} />
                            <h3>A Problem Occured - Try Again</h3>
                        </div>
                    }
                </div>
                <DialogFooter>
                    <div className='grid grid-cols-2'>
                        <button onClick={handleDelete} className="col-span-2 mb-10 border border-black px-10 rounded-md m-auto bg-red-300 text-lg hover:bg-blue-300">Delete Sub</button>
                        <button onClick={handleSubmit} className="col-span-1 mr-5 border border-black px-10 rounded-md m-auto bg-blue-100 text-lg hover:bg-blue-300">Submit</button>
                        <button onClick={toggleHideDialog} className="col-span-1 border border-black px-10 rounded-md m-auto bg-blue-100 text-lg hover:bg-blue-300">Cancel</button>           
                    </div>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default SubTable