import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Custom.css';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { Autocomplete, TextField, Button } from '@mui/material';
import { FaCalendarDay } from "react-icons/fa";
import { PACKAGE_ADDRESSES } from '../../../lib/consts/packageAddresses';
import { useState } from 'react';
import ImageUploader from '../../custom/ImageUploader';
import { fetchPackageByAddressList } from '../../../services/packageServices';
function CreateTour(props) {
    // TOUR GENERAL INFORMATION
    const TOUR_STATUS = ['Completed', 'Incompleted'];
    const [tourName, setTourName] = useState('');
    const [totalDay, setTotalDay] = useState(0);
    const [totalNight, setTotalNight] = useState(0);
    const [addressList, setAddressList] = useState([]);
    const [tourPrice, setTourPrice] = useState(0);
    const [tourStatus, setTourStatus] = useState('incompleted');
    const handleTourName = (event) => {
        setTourName(event.target.value);
    }
    const handleTotalDay = (event) => {
        setTotalDay(event.target.tourName);
    }
    const handleTotalNight = (event) => {
        setTotalNight(event.target.value);
    }
    const handleAddressList = (event, newValue) => {
        setAddressList(newValue);
    }
    const handleTourPrice = (event) => {
        setTourPrice(event.target.value);
    }
    const handleTourStatus = (event, newValue) => {
        setAddressList(newValue);
    }

    // TOUR SCHEDULE

    // Get list of Packages
    const fetchPackageByAddress = async () => {
        const addressValues = addressList.map(item => item.value);
        const addressValueString = addressValues.join('|');
        const encodedAddressList = encodeURIComponent(addressValueString);
        let response = await fetchPackageByAddressList(encodedAddressList);
        console.log(response.data);
    }
    useEffect(() => {
        fetchPackageByAddress();
    }, [addressList])
    const [tourSchedule, setTourSchedule] = useState([]);
    const [daySummaries, setDaySummaries] = useState(Array.from({ length: tourSchedule.length }, () => ""));

    const handlePackageChange = (dayIndex, packageIndex, value) => {
        setTourSchedule(prevTourSchedule => {
            const newTourSchedule = [...prevTourSchedule];
            newTourSchedule[dayIndex][packageIndex] = value;
            return newTourSchedule;
        });
    };

    const handleDaySummaryChange = (dayIndex, value) => {
        setDaySummaries(prevDaySummaries => {
            const newDaySummaries = [...prevDaySummaries];
            newDaySummaries[dayIndex] = value;
            return newDaySummaries;
        });
    };

    const handleAddPackage = (dayIndex) => {
        setTourSchedule(prevTourSchedule => {
            const newTourSchedule = [...prevTourSchedule];
            newTourSchedule[dayIndex] = [...newTourSchedule[dayIndex], null];
            return newTourSchedule;
        });
    };

    const handleRemovePackage = (dayIndex, packageIndex) => {
        setTourSchedule(prevTourSchedule => {
            const newTourSchedule = [...prevTourSchedule];
            newTourSchedule[dayIndex].splice(packageIndex, 1);
            return newTourSchedule;
        });
    };

    const handleMovePackage = (dayIndex, packageIndex, direction) => {
        setTourSchedule(prevTourSchedule => {
            const newTourSchedule = [...prevTourSchedule];

            if (direction === 'up' && packageIndex > 0) {
                const temp = newTourSchedule[dayIndex][packageIndex];
                newTourSchedule[dayIndex][packageIndex] = newTourSchedule[dayIndex][packageIndex - 1];
                newTourSchedule[dayIndex][packageIndex - 1] = temp;
            } else if (direction === 'down' && packageIndex < newTourSchedule[dayIndex].length - 1) {
                const temp = newTourSchedule[dayIndex][packageIndex];
                newTourSchedule[dayIndex][packageIndex] = newTourSchedule[dayIndex][packageIndex + 1];
                newTourSchedule[dayIndex][packageIndex + 1] = temp;
            }

            return newTourSchedule;
        });

        // Update daySummaries if needed
    };


    const handleAddDay = () => {
        setTourSchedule(prevTourSchedule => [...prevTourSchedule, []]);
        setDaySummaries(prevDaySummaries => [...prevDaySummaries, '']);
    };

    const handleRemoveDay = (dayIndex) => {
        setTourSchedule(prevTourSchedule => {
            const newTourSchedule = [...prevTourSchedule];
            newTourSchedule.splice(dayIndex, 1);
            return newTourSchedule;
        });
        setDaySummaries(prevDaySummaries => {
            const newDaySummaries = [...prevDaySummaries];
            newDaySummaries.splice(dayIndex, 1);
            return newDaySummaries;
        });
    };
    return (
        <div className='flex flex-col max-h-full overflow-y-auto' >
            <Link to='/tour' className='w-64 mb-4 text-md heading-color font-semibold btn-back p-2 cursor-pointer rounded-lg'>
                <FaAngleDoubleLeft className='inline mr-2' />
                <div className='inline'>Back to Tour Management</div>
            </Link>
            <div className='inline text-2xl heading-color font-bold text-center mb-4'>Create Tour</div>
            <div className='flex flex-wrap xl:gap-8 gap-4'>
                <div className='flex-1 border border-blue-500 2xl:px-16 px-8 py-4 rounded-lg'>
                    <div className='text-lg font-semibold heading-color text-center'>Tour General Information</div>
                    <div className='mt-4'>
                        <TextField
                            fullWidth
                            label='Tour name'
                            placeholder='Enter tour name'
                            onChange={handleTourName}
                            required />
                    </div>
                    <div className='mt-4 flex'>
                        <div className='flex-1 mr-2'>
                            <TextField
                                type='number'
                                label='Total day'
                                onChange={handleTotalDay}
                                inputProps={{ min: 1 }}
                                fullWidth
                                required />
                        </div>
                        <div className='flex-1'>
                            <TextField
                                type='number'
                                label='Total night'
                                onChange={handleTotalNight}
                                inputProps={{ min: 1 }}
                                fullWidth
                                required />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <Autocomplete
                            multiple
                            options={PACKAGE_ADDRESSES}
                            onChange={handleAddressList}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Address List"
                                    required
                                />
                            )} />
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='mt-4 flex-1 mr-2'>
                            <TextField
                                type='money'
                                label='Tour price'
                                onChange={handleTourPrice}
                                fullWidth
                                required />
                        </div>
                        <div className='mt-4 flex-1'>
                            <Autocomplete
                                id="tourStatus"
                                options={TOUR_STATUS}
                                onChange={handleTourStatus}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Tour Status" fullWidth required />}
                            />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <ImageUploader />
                    </div>
                    {/* <img className='mt-4 cursor-pointer' src='./ImgPlaceholder.png' /> */}
                </div>
                <div className='flex-1 border border-blue-500 px-8 py-4 rounded-lg'>
                    <div className='text-lg font-semibold heading-color text-center '>Tour Schedule</div>
                    <div className='mt-2'>
                        {tourSchedule.map((day, dayIndex) => (
                            <div className='rounded-lg border border-blue-500 px-4 py-2 mb-4'>
                                <div className='mb-8' key={dayIndex}>
                                    <div className='flex flex-row items-center mb-4 mt-2'>
                                        <div className='mr-4 text-lg font-semibold'>
                                            <FaCalendarDay className='inline mr-2 mb-1' />
                                            {`Day ${dayIndex + 1}`}
                                        </div>
                                        <TextField
                                            size='small'
                                            label={`Day Summary`}
                                            value={daySummaries[dayIndex]}
                                            onChange={(e) => handleDaySummaryChange(dayIndex, e.target.value)}
                                        />
                                        <Button className='!normal-case !bg-red-300 !ml-2' variant="contained" color="secondary" onClick={(e) => handleRemoveDay(dayIndex, e.target.value)}>
                                            Remove day
                                        </Button>
                                    </div>
                                    {day.map((packageItem, packageIndex) => (
                                        <div className='mt-6' key={packageIndex}>
                                            <div className='flex flex-row flex-wrap gap-2'>
                                                <Autocomplete
                                                    className='flex-1 ml-4'
                                                    size='small'
                                                    key={packageItem} // Thêm key vào đây
                                                    value={packageItem}
                                                    options={['Package1.1', 'Package1.2', 'Package2.1', 'Package2.2', 'Package3.1', 'Package3.2']}
                                                    onChange={(event, newValue) => handlePackageChange(dayIndex, packageIndex, newValue)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label={`Package ${packageIndex + 1}`}

                                                        />
                                                    )}
                                                />
                                                <Button className='!normal-case !bg-red-300' variant="contained" color="secondary" onClick={() => handleRemovePackage(dayIndex, packageIndex)}>
                                                    Remove
                                                </Button>
                                                <Button className='!normal-case !bg-blue-300' variant="contained" color="primary" onClick={() => handleMovePackage(dayIndex, packageIndex, 'up')}>
                                                    Up
                                                </Button>
                                                <Button className='!normal-case !bg-blue-300' variant="contained" color="primary" onClick={() => handleMovePackage(dayIndex, packageIndex, 'down')}>
                                                    Down
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button className='!normal-case !my-2 !ml-4 !bg-blue-500' variant="contained" color="primary" onClick={() => handleAddPackage(dayIndex)}>
                                    Add Package to Day
                                </Button>
                            </div>
                        ))}
                        <div className='mt-2 flex justify-center'>
                            <Button className='!normal-case w-64 !bg-green-300' variant="contained" color="primary" onClick={handleAddDay}>
                                Add A Day
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <Button className='!bg-green-500 !normal-case w-64 !bg-green-300 !mt-8 !mb-8' variant="contained">
                    Save
                </Button>
            </div>
        </div>
    );
}

export default CreateTour;