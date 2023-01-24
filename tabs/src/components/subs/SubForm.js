import React, { useState, useContext } from 'react'
import { DatePicker, Dropdown, TextField } from "@fluentui/react";
import SubmitSuccess from './SubmitSuccess';
import SubmitFail from './SubmitFail';
import { TeamsFxContext } from "../Context";

const SubForm = (props) => {
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

    //sub data state
    const [subDate, setSubDate] = useState(new Date());
    const [subType, setSubType] = useState('');
    const [subHotel, setSubHotel] = useState('');
    const [subTown, setSubTown] = useState('');
    const [success, setSuccess] = useState('');

    //handle subType change
    const handleSubTypeChange = (e, selectedOption) => {
        if(selectedOption.text === 'Full Sub'){
            setSubHotel('N/A');
            setSubTown('N/A');
        } else {
            setSubHotel('');
            setSubTown('');
        }
        setSubType(selectedOption.text);
    }

    //handle sub date change
    const handleDateChange = (value) => {
        let currentDate = new Date();
        let enteredDate = new Date(value);

        if((currentDate - enteredDate) > 12096e5){
            window.alert('Cannot select a date from more than 2 weeks ago');
            value = new Date();
        }

        if(enteredDate > currentDate){
            window.alert('Cannot select a date in the future');
            value = new Date();
        }

        setSubDate(value);
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
                        console.log(data)
                        newData.push(data.data);
                        newData.sort((a, b) => {
                            return new Date(b.date) - new Date(a.date)
                        })
                        props.setData(newData);
                        setSubDate(new Date());
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
        // {key: "northernSub", text: "Northern Sub"},
        {key: "fullSub", text: "Full Sub"},
        {key: "mealSub", text: "Meal Sub"},
    ]

    return (
        <>
            <div className="p-5">
                <h1>Enter Your Daily Sub</h1>
                <h2 className={`${themeString === 'dark' ? 'text-white' : ''} text-xl`}>Select the sub that applies to you for any specific day.</h2>
                <h2 className={`${themeString === 'dark' ? 'text-white' : ''} text-xl`}>You cannot select date longer than two weeks of the present day or any future dates</h2>
            </div>


            <form className="mr-10 w-full">
                <div className="lg:grid lg:grid-cols-4">
                    <div className="col-span-1 px-2">
                        <DatePicker
                            label='Select Date'
                            styles={labelStyles}
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
                            styles={{
                                label: {
                                    color: `${themeString === 'dark' ? 'white' : 'black'}`
                                }
                            }}
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
                            styles={labelStyles}
                            onChange={handleHotelChange}
                            value={subHotel}
                            disabled={subHotel === 'N/A' ? true : false}
                        />                        
                    </div>
                    <div className="col-span-1 px-2">
                        <TextField 
                            required
                            label='Enter Town Name'
                            styles={labelStyles}
                            onChange={handleTownChange}
                            value={subTown}
                            disabled={subTown === 'N/A' ? true : false}
                        />
                    </div>
                </div>

                <div className="col-span-4 flex mt-5">

                    <button onClick={handleSubmit} className={`border border-black px-10 py-3 rounded-md m-auto bg-blue-100 text-xl hover:bg-blue-300 ${themeString === 'dark' ? 'text-black': ''}`}>Submit</button>

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