import React, { useState } from 'react'
import { DatePicker, Dropdown, TextField } from "@fluentui/react";
import SubmitSuccess from './SubmitSuccess';
import SubmitFail from './SubmitFail';

const SubForm = (props) => {

    //sub data state
    const [subDate, setSubDate] = useState('');
    const [subType, setSubType] = useState('');
    const [subHotel, setSubHotel] = useState('');
    const [subTown, setSubTown] = useState('');
    const [success, setSuccess] = useState('');

    //handle subType change
    const handleSubTypeChange = (e, selectedOption) => {
        setSubType(selectedOption.text);
    }

    //handle sub date change
    const handleDateChange = (value) => {
        setSubDate(value);
        // console.log(value)
    }

    //handle sub hotel change
    const handleHotelChange = (e) => {
        setSubHotel(e.target.value);
    }

    //handle sub town change
    const handleTownChange = (e) => {
        setSubTown(e.target.value);
    }

    const url = 'https://marler-api.herokuapp.com/api/v1/subs';

    //handle submit 
    const handleSubmit = (e) => {
        e.preventDefault()

        if (
            subDate !== '' &&
            subType !== '' &&
            subHotel !== '' &&
            subTown !== ''
        ) {

            let submitData = {
                date: subDate,
                subType: subType,
                hotel: subHotel,
                town: subTown,
                user: props.userName
            }

            let newData = [...props.data];

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData)
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setSuccess('success');
                        newData.push(data.data);
                        props.setData(newData);
                        setSubDate('');
                        setSubType('');
                        setSubHotel('');
                        setSubTown('');
                    } else {
                        setSuccess('failed');
                    }
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
                });
        } else {
            setSuccess('failed')
            setTimeout(() => {
                setSuccess('')
            }, 4000);
        }

    }


    const options = [
        {key: "northernSub", text: "Northern Sub"},
        {key: "fullSub", text: "Full Sub"},
        {key: "mealSub", text: "Meal Sub"},
    ]

    return (
        <>
            <div className="text-center">
                <h1>Enter Your Daily Sub</h1>
            </div>


            <form className="m-10">
                <div className="grid grid-cols-4">
                    <div className="col-span-1 px-2">
                        <DatePicker
                            label='Select Date'
                            isRequired
                            //   className={styles.control}
                            allowTextInput
                            onSelectDate={handleDateChange}
                            placeholder="Select Date"
                            id='date'
                            value={subDate}
                        />
                    </div>
                    <div className="col-span-1 px-2">
                        <Dropdown 
                            label='Select Sub Type'
                            required
                            options={options}
                            placeholder="Select a Sub Type"
                            onChange={handleSubTypeChange}
                            value={subType} 
                        />
                    </div>
                    <div className="col-span-1 px-2">
                        <TextField 
                            required
                            label='Enter Hotel Name'
                            onChange={handleHotelChange}
                            value={subHotel}
                        />                        
                    </div>
                    <div className="col-span-1 px-2">
                        <TextField 
                            required
                            label='Enter Town Name'
                            onChange={handleTownChange}
                            value={subTown}
                        />
                    </div>
                </div>

                <div className="col-span-4 flex mt-5">

                    <button onClick={handleSubmit} className="border border-black px-10 py-3 rounded-md m-auto bg-blue-100 text-xl hover:bg-blue-300">Submit</button>

                </div>
            </form>

            <div className="h-20 flex justify-center">
                {success === 'success' &&
                    <SubmitSuccess />
                }
                {success === 'failed' &&
                    <SubmitFail />
                }
            </div>

        </>
    )
}

export default SubForm