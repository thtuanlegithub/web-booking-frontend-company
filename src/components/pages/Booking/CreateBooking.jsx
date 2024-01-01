import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { Autocomplete, Button, TextField } from '@mui/material';
import { fetchTravelPagination } from '../../../services/travelServices';
import dayjs from 'dayjs';
import MainImageUploader from '../../custom/MainImageUploader';
import { createBooking } from '../../../services/bookingServices';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const BOOKING_STATUS = [
    { label: 'Paid', value: 'Paid' },
    { label: 'Unpaid', value: 'Unpaid' },
    { label: 'Cancel', value: 'Cancel' }
]
function CreateBooking(props) {
    let navigate = useNavigate();
    const [numberOfTourist, setNumberOfTourist] = useState(1);
    const [bookingPrice, setBookingPrice] = useState('');
    const [bookingStatus, setBookingStatus] = useState(BOOKING_STATUS[1]);
    const [travelListOptions, setTravelListOptions] = useState([]);
    const [selectedTravel, setSelectedTravel] = useState(null);
    const [selectedTravelStartLocation, setSelectedTravelStartLocation] = useState('');
    const [selectedTravelStartDateTime, setSelecedTravelStartDateTime] = useState('');
    const [selectedTravelMaxTicket, setSelectedTravelMaxTicket] = useState('');
    const [selectedTravelRemainTicket, setSelectedTravelRemainTicket] = useState('');
    const [selectedTravelDiscount, setSelectedTravelDiscount] = useState('');
    const [selectedTravelPrice, setSelectedTravelPrice] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerGmail, setCustomerGmail] = useState('');
    const [paymentNote, setPaymentNote] = useState('');
    const [paymentImage, setPaymentImage] = useState(null);
    const [paymentImageChangeCall, setPaymentImageChangeCall] = useState([]);
    const [touristList, setTouristList] = useState(['']);
    const [exportInvoice, setExportInvoice] = useState(false);

    const mainImageUploader = useRef();
    const handleLoadMainImage = (paymentImageId) => {
        console.log(">>> paymentImageId", paymentImageId);
        setPaymentImage(paymentImageId);
    }
    const handleLoadMainImageCall = (paymentImageChangeCall) => {
        console.log(">>> paymentImageChangeCall", paymentImageChangeCall);
        setPaymentImageChangeCall(paymentImageChangeCall);
    }
    const handleNumberOfTouristChange = (event) => {
        const newNumberOfTourist = parseInt(event.target.value, 10);
        setNumberOfTourist(newNumberOfTourist);
        console.log(newNumberOfTourist);
        // Update touristList length
        setTouristList((prevList) => {
            const newList = [...prevList];
            while (newList.length < newNumberOfTourist) {
                newList.push('');
            }
            return newList.slice(0, newNumberOfTourist);
        });
    };

    const handleTouristChange = (event, index) => {
        const newTouristName = event.target.value;

        setTouristList((prevList) => {
            const newList = [...prevList];
            newList[index] = newTouristName;
            return newList;
        });
    };

    const handleBookingStatusChange = (event, newValue) => {
        setBookingStatus(newValue);
    }

    const handleCustomerPhoneChange = (event) => {
        setCustomerPhone(event.target.value);
    }

    const handleCustomerNameChange = (event) => {
        setCustomerName(event.target.value);
    }

    const handleCustomerGmailChange = (event) => {
        setCustomerGmail(event.target.value);
    }

    const handlePaymentNoteChange = (event) => {
        setPaymentNote(event.target.value);
    }

    useEffect(() => {
        if (paymentImage != null && paymentImageChangeCall.length > 0) {
            fetchCreateBooking();
        }
    }, [paymentImage, paymentImageChangeCall]);

    useEffect(() => {
        if (selectedTravel) {
            setBookingPrice(numberOfTourist * selectedTravel.value.travelPrice);
        }
        else {
            setBookingPrice('');
        }
    }, [numberOfTourist, selectedTravel])
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };
    const validateInput = () => {
        if (bookingStatus == null) {
            setSnackbarMessage('Booking status has to be selected');
            setOpenSnackbar(true);
            return false;
        }
        if (customerPhone == '' || customerPhone == null) {
            setSnackbarMessage('Customer phone number has to be filled');
            setOpenSnackbar(true);
            return false;
        }
        if (customerName == '' || customerName == null) {
            setSnackbarMessage('Customer name has to be filled');
            setOpenSnackbar(true);
            return false;
        }
        if (customerGmail == '' || customerGmail == null) {
            setSnackbarMessage('Customer gmail has to be filled');
            setOpenSnackbar(true);
            return false;
        }
        let touristInvalid = true;
        touristList.forEach((touristItem, touristIndex) => {
            if (touristItem == '') {
                setSnackbarMessage(`Tourist ${touristIndex} has to be filled`);
                setOpenSnackbar(true);
                touristInvalid = false;
                return false;
            }
        })
        if (touristInvalid) {
            return false;
        }
        if (selectedTravel == null) {
            setSnackbarMessage('Travel has to be selected');
            setOpenSnackbar(true);
            return false;
        }
        return true;
    }

    const fetchCreateBooking = async () => {
        if (validateInput()) {
            let bookingData = {
                exportInvoice: exportInvoice,
                bookingStatus: bookingStatus.value,
                bookingPrice: bookingPrice,
                bookingDate: dayjs(new Date()).format('DD/MM/YYYY HH:mm'),
                customer: {
                    customerPhone: customerPhone,
                    customerName: customerName,
                    customerGmail: customerGmail,
                },
                touristList: touristList
                ,
                paymentNote: paymentNote,
                paymentImage: paymentImage,
                travelId: selectedTravel.value.id
            }
            console.log(bookingData);
            let res = await createBooking(bookingData);
            if (res && res.data && res.data.EC === '0') {
                alert("Create Booking successfully!");
                navigate('/booking');
            }
        }
    }

    const handleCreateBooking = async () => {
        await mainImageUploader.current.handleUploadImages();
    }

    const handleTravelOptionChange = (event, newValue) => {
        if (newValue) {
            setSelectedTravel(newValue);
            setSelectedTravelStartLocation(newValue.value.startLocation);
            setSelecedTravelStartDateTime(dayjs(newValue.value.startDateTime).format("DD/MM/YYYY HH:mm A"));
            setSelectedTravelMaxTicket(newValue.value.maxTicket);
            setSelectedTravelRemainTicket(newValue.value.remainTicket);
            setSelectedTravelDiscount(newValue.value.discountId);
            setSelectedTravelPrice(newValue.value.travelPrice);
        }
        else {
            setSelectedTravel(newValue);
            setSelectedTravelStartLocation('');
            setSelecedTravelStartDateTime('');
            setSelectedTravelMaxTicket('');
            setSelectedTravelRemainTicket('');
            setSelectedTravelDiscount('');
            setSelectedTravelPrice('');
        }
    }

    useEffect(() => {
        getListTravelOptions();
    }, [])

    const getListTravelOptions = async () => {
        let res = await fetchTravelPagination(0, 0);
        if (res && res.data && res.data.EC === '0') {
            let travelList = res.data.DT;
            setTravelListOptions(travelList.map((item) => ({ label: item.id + ' - ' + item.Tour.tourName, value: item })));
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
            <div className='flex flex-col max-h-full overflow-y-auto'>
                <Link to='/booking' className='w-72 mb-4 text-md heading-color font-semibold btn-back p-2 cursor-pointer rounded-lg'>
                    <FaAngleDoubleLeft className='inline mr-2' />
                    <div className='inline'>Back to Booking Management</div>
                </Link>
                <div className='inline text-2xl heading-color font-bold text-center mb-4'>Create Booking</div>
                <div className='flex flex-wrap xl:gap-8 gap-4'>
                    <div className='flex-1 border border-blue-500 2xl:px-16 px-8 py-4 rounded-lg'>
                        <div className='text-xl font-semibold heading-color text-center'>Booking Information</div>
                        <div className='px-8 py-4 mt-2 rounded-xl'>
                            <Autocomplete
                                value={bookingStatus}
                                onChange={handleBookingStatusChange}
                                options={BOOKING_STATUS}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label='Booking Status'
                                    />
                                )}
                            />
                            <TextField
                                inputProps={
                                    { readOnly: true }
                                }
                                value={bookingPrice}
                                className='!mt-4'
                                label='Booking Price'
                                fullWidth
                            />
                            <div className='mt-4 text-lg font-semibold heading-color text-left'>Contact Information</div>
                            <TextField
                                value={customerPhone}
                                onChange={handleCustomerPhoneChange}
                                className='!mt-4'
                                label='Phone number'
                                fullWidth />
                            <TextField
                                value={customerName}
                                onChange={handleCustomerNameChange}
                                className='!mt-4'
                                label='Customer name'
                                fullWidth />
                            <TextField
                                value={customerGmail}
                                onChange={handleCustomerGmailChange}
                                className='!mt-4'
                                label='Gmail'
                                fullWidth />
                            <div className='mt-8 text-lg font-semibold heading-color text-left'>Tourists Information</div>
                            <TextField
                                value={numberOfTourist}
                                onChange={handleNumberOfTouristChange}
                                className='!mt-4'
                                label='Number of tourists'
                                type='number'
                                inputProps={{
                                    min: 1
                                }} />
                            <div className='flex flex-wrap'>
                                {touristList.map((touristName, index) => (
                                    <TextField
                                        value={touristName}
                                        onChange={(event) => handleTouristChange(event, index)}
                                        fullWidth
                                        key={index}
                                        className='!mt-4 !mx-4'
                                        label={`Tourist ${index + 1} name`}
                                    />
                                ))}
                            </div>
                            <div className='mt-8 text-lg font-semibold heading-color text-left'>Payment Information</div>
                            <TextField fullWidth
                                value={paymentNote}
                                onChange={handlePaymentNoteChange}
                                label='Payment Note'
                                className='!my-4' />
                            <MainImageUploader
                                ref={mainImageUploader}
                                onMainImageUpload={handleLoadMainImage}
                                onMainImageChangeCall={handleLoadMainImageCall}
                            />
                        </div>
                        <div className='w-96'></div>
                    </div>
                    <div className='flex-1 border border-blue-500 2xl:px-16 px-8 py-4 rounded-lg'>
                        <div className='text-xl font-semibold heading-color text-center'>Travel Information</div>
                        <Autocomplete
                            className='flex-1 !mt-4'
                            value={selectedTravel}
                            options={travelListOptions}
                            onChange={handleTravelOptionChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Travel'
                                    placeholder='Select a Travel'
                                />
                            )}
                        />
                        <TextField
                            value={selectedTravelStartLocation}
                            inputProps={{
                                readOnly: true
                            }}
                            variant='filled'
                            className='!mt-4 flex-1 mx-4'
                            label='Start Location'
                            fullWidth />
                        <div className='grid 2xl:grid-cols-2 grid-cols-1 gap-4 !mt-4'>
                            <TextField
                                value={selectedTravelStartDateTime}
                                inputProps={{
                                    readOnly: true
                                }}
                                variant='filled'
                                label='Start Date Time'
                                fullWidth
                            />
                            <div className='grid sm:grid-cols-2 grid-cols-1 gap-2'>
                                <TextField
                                    value={selectedTravelMaxTicket}
                                    variant='filled'
                                    label='Max Ticket'
                                    type='number'
                                    inputProps={{
                                        min: 1,
                                        readOnly: true
                                    }} />
                                <TextField
                                    value={selectedTravelRemainTicket}
                                    variant='filled'
                                    label='Remain Ticket'
                                    type='number'
                                    inputProps={{
                                        min: 0,
                                        readOnly: true
                                    }} />
                            </div>
                        </div>
                        <TextField
                            value={selectedTravelDiscount}
                            className='!mt-4'
                            fullWidth
                            variant='filled'
                            label='Discount'
                            inputProps={{
                                readOnly: true
                            }} />
                        <TextField
                            value={selectedTravelPrice}
                            variant='filled'
                            inputProps={{
                                readOnly: true
                            }}
                            className='!mt-4 w-full !bg-yellow-100'
                            label='Travel Price' />
                        <div className='w-96'></div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Button
                        className='!bg-green-500 !normal-case w-64 !bg-green-300 !mt-8 !mb-8'
                        variant="contained"
                        onClick={handleCreateBooking}>
                        Save
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CreateBooking;