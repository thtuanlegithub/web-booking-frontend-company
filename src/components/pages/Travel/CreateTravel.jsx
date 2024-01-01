import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDoubleLeft, FaCalendarDay } from 'react-icons/fa';
import { Autocomplete, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ReadOnlyImageGallery from '../../custom/ReadOnlyImageGallery';
import { fetchTourById, fetchTourPagination } from '../../../services/tourServices';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import '../../styles/Custom.css';
import { createTravel } from '../../../services/travelServices';
import { fetchDiscountPagination } from '../../../services/discountServices';
import formatCurrency from '../../utils/formatCurrency';
import removeCommas from '../../utils/removeCommas';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
function CreateTravel(props) {
    let navigate = useNavigate();

    // Travel Information
    const [selectedTour, setSelectedTour] = useState(null);
    const [tourListOptions, setTourListOptions] = useState([]);
    const [discountListOptions, setDiscountListOptions] = useState([]);
    const [startLocation, setStartLocation] = useState('');
    const [startDateTime, setStartDateTime] = useState(dayjs().add(7, 'day'));
    const [maxTicket, setMaxTicket] = useState(null);
    const [remainTicket, setRemainTicket] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [travelPrice, setTravelPrice] = useState(0);
    useEffect(() => {
        fetchTourListOptions();
        fetchDiscountList();
    }, []);
    const fetchDiscountList = async () => {
        let res = await fetchDiscountPagination(0, 0);
        if (res && res.data && res.data.EC === '0') {
            let discounts = res.data.DT;
            setDiscountListOptions(discounts.map((item) => ({ label: item.id + " - " + item.discountName, value: item })))
        }
    }
    const handleStartLocationChange = (event) => {
        setStartLocation(event.target.value);
    }

    const handleStartDateTimeChange = (newValue) => {
        setStartDateTime(dayjs(newValue));
        console.log('startDateTime', startDateTime);
    }

    const handleMaxTicketChange = (event) => {
        setMaxTicket(event.target.value);
    }

    const handleRemainTicketChange = (event) => {
        setRemainTicket(event.target.value);
    }
    const handleDiscountChange = (event, newValue) => {
        setDiscount(newValue);
        if (newValue && newValue.value) {
            if (selectedTour && selectedTour.value) {
                if (newValue.value.discountType == 'Percentage') {
                    let newTravelPrice = selectedTourPrice * (100 - newValue.value.discountAmount) / 100;
                    setTravelPrice(newTravelPrice);
                }
                else if (newValue.value.discountType == 'Amount') {
                    let newTravelPrice = selectedTourPrice - newValue.value.discountAmount;
                    setTravelPrice(newTravelPrice);
                }
                console.log("selectedTour.value: ", selectedTourPrice)
            }
        }
        else {
            setTravelPrice(selectedTourPrice);
        }
    }
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };
    const validateInput = () => {
        if (selectedTour == null) {
            setSnackbarMessage('Tour Name has to be selected');
            setOpenSnackbar(true);
            return false;
        }
        if (startLocation == null || startLocation == '') {
            setSnackbarMessage('Start Location has to be filled');
            setOpenSnackbar(true);
            return false;
        }
        if (startDateTime == null) {
            setSnackbarMessage('Start Date Time has to be selected');
            setOpenSnackbar(true);
            return false;
        }
        if (maxTicket == 0 || maxTicket == null) {
            setSnackbarMessage('Max Ticket has to be filled and larger than 0');
            setOpenSnackbar(true);
            return false;
        }
        if (remainTicket == 0 || remainTicket == null) {
            setSnackbarMessage('Remain Ticket has to be filled and larger than 0');
            setOpenSnackbar(true);
            return false;
        }
        if (remainTicket > maxTicket) {
            setSnackbarMessage('Max Ticket has to be larger than or equal remain ticket');
            setOpenSnackbar(true);
            return false;
        }
        if (discount == null) {
            setDiscount({ label: '', value: '' });
        }
        return true;
    }
    // Create Travel
    const handleCreateTravel = async () => {
        if (validateInput()) {
            if (discount) {
                let travelData = {
                    startLocation: startLocation,
                    startDateTime: startDateTime.format('MM-DD-YYYY HH:mm'),
                    maxTicket: maxTicket,
                    remainTicket: remainTicket,
                    travelPrice: travelPrice,
                    discountId: discount.value.id,
                    tourId: selectedTour.value
                }
                let res = await createTravel(travelData);
                if (res && res.data && res.data.EC === '0') {
                    alert("Create Travel successfully!");
                    navigate('/travel');
                }
            }
            else {
                let travelData = {
                    startLocation: startLocation,
                    startDateTime: startDateTime.format('MM-DD-YYYY HH:mm'),
                    maxTicket: maxTicket,
                    remainTicket: remainTicket,
                    travelPrice: travelPrice,
                    discountId: null,
                    tourId: selectedTour.value
                }
                let res = await createTravel(travelData);
                if (res && res.data && res.data.EC === '0') {
                    alert("Create Travel successfully!");
                    navigate('/travel');
                }
            }
        }
    }

    // Tour General Information - Tour Schedule
    useEffect(() => {
        fetchSelectedTour();
    }, [selectedTour]);
    const [selectedTourName, setSelectedTourName] = useState('');
    const [selectedTourTotalDay, setSelectedTourTotalDay] = useState('');
    const [selectedTourTotalNight, setSelectedTourTotalNight] = useState('');
    const [selectedTourAddressList, setSelectedTourAddressList] = useState('');
    const [selectedTourPrice, setSelectedTourPrice] = useState('');
    const [selectedTourStatus, setSelectedTourStatus] = useState('');
    const [selectedTourMainImageUrl, setSelectedTourMainImageUrl] = useState('');
    const [selectedTourAdditionalImageUrls, setSelectedTourAdditionalImageUrls] = useState([]);
    const [selectedTourSchedule, setSelectedTourSchedule] = useState(null);
    const fetchTourListOptions = async () => {
        let res = await fetchTourPagination(0, 0);
        if (res && res.data && res.data.EC === '0') {
            let tourList = res.data.DT;
            setTourListOptions(tourList.filter((item) => item.tourStatus === 'Completed').map((item) => ({ label: item.tourName, value: item.id })));
            console.log(tourListOptions);
        }
    }
    const fetchSelectedTour = async () => {
        if (selectedTour && selectedTour.value) {
            // console.log(selectedTour);
            let response = await fetchTourById(selectedTour.value);
            if (response && response.data && response.data.EC === '0') {
                let data = response.data.DT;
                // console.log(data);
                setSelectedTourName(data.tourName);
                setSelectedTourTotalDay(data.totalDay);
                setSelectedTourTotalNight(data.totalNight);
                setSelectedTourAddressList(data.addressList);
                setSelectedTourPrice(data.tourPrice);
                if (discount == null) {
                    setTravelPrice(data.tourPrice);
                }
                else {
                    if (discount.value.discountType === 'Percentage') {
                        setTravelPrice((data.tourPrice) * (100 - discount.value.discountAmount) / 100)
                    }
                    else if (discount.value.discountType === 'Amount') {
                        setTravelPrice((data.tourPrice) - (discount.value.discountAmount));
                    }
                }
                setSelectedTourStatus(data.tourStatus);
                setSelectedTourMainImageUrl(data.mainImage);
                let listAdditionalImages = data.TourAdditionalImages;
                let listAdditionalImageUrls = [];
                listAdditionalImages.map((item) => {
                    listAdditionalImageUrls.push(item.additionalImage);
                })
                setSelectedTourAdditionalImageUrls(listAdditionalImageUrls);
                setSelectedTourSchedule(data.TourSchedules);
            }
        }
        else {
            setDefaultSelectedTour();
        }
    }
    const setDefaultSelectedTour = () => {
        setSelectedTourName('');
        setSelectedTourTotalDay('');
        setSelectedTourTotalNight('');
        setSelectedTourAddressList('');
        setSelectedTourPrice(0);
        setSelectedTourStatus('');
        setSelectedTourMainImageUrl(null);
        setSelectedTourAdditionalImageUrls([]);
        setSelectedTourSchedule(null);
        setTravelPrice(0);
    }
    const handleSelectedTourChange = (event, newValue) => {
        if (newValue) {
            setSelectedTour(newValue);
        }
        else {
            setSelectedTour(null);
        }
    }
    return (
        <>
            <Snackbar
                className='!z-50'
                open={openSnackbar}
                autoHideDuration={6000} // Thời gian hiển thị (milliseconds)
                onClose={handleCloseSnackbar}
            >
                <MuiAlert onClose={handleCloseSnackbar} severity="error" elevation={6} variant="filled">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
            <div className='flex flex-col max-h-full overflow-y-auto' >
                <Link to='/travel' className='w-64 mb-4 text-md heading-color font-semibold btn-back p-2 cursor-pointer rounded-lg'>
                    <FaAngleDoubleLeft className='inline mr-2' />
                    <div className='inline'>Back to Travel Management</div>
                </Link>
                <div className='inline text-2xl heading-color font-bold text-center mb-4'>Create Travel</div>
                <div className='flex flex-wrap xl:gap-8 gap-4'>
                    <div className='flex-1 border border-blue-500 2xl:px-16 px-8 py-4 rounded-lg'>
                        <div className='text-xl font-semibold heading-color text-center'>Travel Information</div>
                        <div className='w-64'></div>
                        <Autocomplete
                            className='flex-1 !mt-4'
                            options={tourListOptions}
                            onChange={handleSelectedTourChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Tour Name'
                                />
                            )}
                        />
                        <TextField
                            value={startLocation}
                            onChange={handleStartLocationChange}
                            className='!mt-4 flex-1 mx-4'
                            label='Start Location'
                            fullWidth />
                        <div className='grid 2xl:grid-cols-2 grid-cols-1 gap-4 !mt-4'>
                            <DateTimePicker label='Start date time'
                                format='DD/MM/YYYY h:m A'
                                value={startDateTime}
                                onChange={handleStartDateTimeChange} />
                            <div className='grid sm:grid-cols-2 grid-cols-1 gap-2'>
                                <TextField
                                    value={maxTicket}
                                    onChange={handleMaxTicketChange}
                                    label='Max Ticket'
                                    type='number'
                                    inputProps={{ min: 1 }} />
                                <TextField
                                    value={remainTicket}
                                    onChange={handleRemainTicketChange}
                                    label='Remain Ticket'
                                    type='number'
                                    inputProps={{ min: 0 }} />
                            </div>
                        </div>
                        <Autocomplete
                            onChange={handleDiscountChange}
                            className='flex-1 !mt-4'
                            options={discountListOptions}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Discount'
                                />
                            )}
                        />
                        <TextField
                            inputProps={{
                                readOnly: true
                            }}
                            value={formatCurrency(travelPrice)}
                            className='!mt-4 w-full bg-yellow-50'
                            label='Travel Price' />
                    </div>
                    <div className='flex-1 border border-blue-500 px-8 py-4 rounded-lg'>
                        <div className='text-xl font-semibold heading-color text-center'>Tour General Information</div>
                        <div className='mt-4'>
                            <TextField
                                variant='filled'
                                value={selectedTourName}
                                label='Tour name'
                                inputProps={{
                                    readOnly: true
                                }}
                                fullWidth />

                        </div>
                        <div className='mt-4 flex'>
                            <div className='flex-1 mr-2'>
                                <TextField
                                    variant='filled'
                                    value={selectedTourTotalDay}
                                    type='number'
                                    label='Total day'
                                    inputProps={{ min: 1, readOnly: true }}
                                    fullWidth />
                            </div>
                            <div className='flex-1'>
                                <TextField
                                    variant='filled'
                                    value={selectedTourTotalNight}
                                    type='number'
                                    label='Total night'
                                    inputProps={{ min: 1, readOnly: true }}
                                    fullWidth />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <TextField
                                variant='filled'
                                value={selectedTourAddressList}
                                label="Address List"
                                inputProps={{ readOnly: true }}
                                fullWidth
                            />
                        </div>
                        <div className='flex flex-wrap'>
                            <div className='mt-4 flex-1 mr-2'>
                                <TextField
                                    variant='filled'
                                    value={formatCurrency(selectedTourPrice)}
                                    type='money'
                                    label='Tour price'
                                    fullWidth
                                    inputProps={{ readOnly: true }} />
                            </div>
                            <div className='mt-4 flex-1'>
                                <TextField
                                    variant='filled'
                                    value={selectedTourStatus}
                                    label="Tour Status"
                                    inputProps={{ readOnly: true }}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <ReadOnlyImageGallery
                                fetchMainImageUrl={selectedTourMainImageUrl}
                                fetchAdditionalImageUrls={selectedTourAdditionalImageUrls} />
                        </div>
                        <div className='w-64'></div>
                    </div>
                    <div className='flex-1 border border-blue-500 px-8 py-4 rounded-lg'>
                        <div className='text-xl font-semibold heading-color text-center'>Tour Schedule</div>
                        {
                            selectedTourSchedule && selectedTourSchedule.map((item) => (
                                <div className='rounded-lg px-8 py-4 mt-4 mb-4 bg-blue-50'>
                                    <div className='text-lg font-bold'>
                                        <div className='inline'>
                                            <FaCalendarDay className='inline mr-2 mb-1' />
                                            <div className='inline mr-2'>Ngày {item.dayIndex}: </div>
                                        </div>
                                        <div className='inline font-medium'>{item.daySummary}</div>
                                    </div>
                                    <div className='text-md font-medium'>
                                        {item.Packages && item.Packages.map((itemPackage) => (
                                            <div className='mt-2 ml-4'>
                                                <div className='mr-4 inline'>•</div>
                                                {itemPackage.packageName}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        }

                        <div className='w-64'></div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Button
                        className='!bg-green-500 !normal-case w-64 !bg-green-300 !mt-8 !mb-8'
                        variant="contained"
                        onClick={handleCreateTravel}>
                        Save
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CreateTravel;