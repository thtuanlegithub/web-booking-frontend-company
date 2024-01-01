import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../styles/Custom.css';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { Autocomplete, TextField, Button } from '@mui/material';
import { FaCalendarDay } from "react-icons/fa";
import { PACKAGE_ADDRESSES } from '../../../lib/consts/packageAddresses';
import UpdateImageUploader from '../../custom/UpdateImageUploader';
import { fetchPackageByAddressList } from '../../../services/packageServices';
import { fetchTourById, updateTour } from '../../../services/tourServices';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
function UpdateTour(props) {
    const navigate = useNavigate();

    // TOUR GENERAL INFORMATION
    const { tourId } = useParams();
    const TOUR_STATUS = [{ label: 'Completed', value: 'Completed' }, { label: 'Incompleted', value: 'Incompleted' }];
    const [tourName, setTourName] = useState('');
    const [totalDay, setTotalDay] = useState(0);
    const [totalNight, setTotalNight] = useState(0);
    const [addressList, setAddressList] = useState([]);
    const [tourPrice, setTourPrice] = useState(0);
    const [tourStatus, setTourStatus] = useState({ label: '', value: '' });
    const handleTourName = (event) => {
        setTourName(event.target.value);
    }
    const handleTotalDay = (event) => {
        setTotalDay(event.target.value);
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
        setTourStatus(newValue);
    }

    // TOUR SCHEDULE

    // Get list of Packages
    const [packageList, setPackageList] = useState([]);
    const [packageListOptions, setPackageListOptions] = useState([]);
    useEffect(() => {
        const fetchPackageByAddress = async () => {
            const addressValues = addressList.map(item => item.value);
            const addressValueString = addressValues.join('|');
            const encodedAddressList = encodeURIComponent(addressValueString);
            let response = await fetchPackageByAddressList(encodedAddressList);
            console.log(response.data.DT, typeof (response.data.DT));
            setPackageList(response.data.DT);
        }
        fetchPackageByAddress();
    }, [addressList])
    useEffect(() => {
        if (Array.isArray(packageList)) {
            // Xử lý khi packageList là mảng
            setPackageListOptions(packageList.map((item) => ({ label: item.packageName, value: item.id })));
        } else {
            console.error("packageList is not an array.");
        }
    }, [packageList])
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

    // UPDATE TOUR
    const [mainImage, setMainImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);

    const imageUploaderRef = useRef();
    const mergeAddressList = () => {
        const addressValues = addressList.map(item => item.value);
        const addressValueString = addressValues.join('|');
        return addressValueString;
    }
    const handleLoadMainImage = (mainImageId) => {
        console.log(">>> handle load main image: ", mainImageId);
        setMainImage(mainImageId);
    }
    const handleLoadAdditionalImages = (additionalImagesId) => {
        console.log(">>> handle load additional images", additionalImagesId);
        setAdditionalImages(additionalImagesId);
    }
    const handleUpdateTour = async () => {
        await imageUploaderRef.current.handleUploadImages();
        // fetchUpdateTour();
    }
    useEffect(() => {
        if (mainImage != null && additionalImages.length > 0) {
            fetchUpdateTour();
        }
    }, [mainImage, additionalImages]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };
    const validateInput = () => {
        let invalidInput = false;
        if (tourName == null || tourName == "") {
            setSnackbarMessage('Tour Name has to be filled');
            setOpenSnackbar(true);
            return false;
        }
        if (totalDay == null || totalDay == 0) {
            setSnackbarMessage('Total day has to be filled and larger than 0');
            setOpenSnackbar(true);
            return false;
        }
        if (totalNight == null || totalNight == 0) {
            setSnackbarMessage('Total night has to be filled and larger than 0');
            setOpenSnackbar(true);
            return false;
        }
        if (addressList.length == 0) {
            setSnackbarMessage('You have to select address list');
            setOpenSnackbar(true);
            return false;
        }
        if (tourPrice == null || tourPrice == 0) {
            setSnackbarMessage('Tour price has to be filled and larger than 0');
            setOpenSnackbar(true);
            return false;
        }
        if (tourStatus == null) {
            setSnackbarMessage('Tour status has to be selected');
            setOpenSnackbar(true);
            return false;
        }
        daySummaries.forEach((summary, dayIndex) => {
            if (!summary.trim()) {
                setSnackbarMessage(`Day ${dayIndex + 1} summary cannot be empty.`);
                setOpenSnackbar(true);
                invalidInput = true;
            }
        });
        if (invalidInput) {
            return false;
        }
        tourSchedule.forEach((day, dayIndex) => {
            day.forEach((packageItem, packageIndex) => {
                if (!packageItem) {
                    setSnackbarMessage(`Package ${packageIndex + 1} in Day ${dayIndex + 1} cannot be empty.`);
                    setOpenSnackbar(true);
                    invalidInput = true;
                }
            });
        });
        if (invalidInput) {
            return false;
        }
        return true;
    }
    const fetchUpdateTour = async () => {
        if (validateInput()) {
            console.log('mainImage in fetchUpdateTour:', mainImage);
            console.log('additionalImages in fetchUpdateTour:', additionalImages);
            const tourData = {
                id: tourId,
                tourGeneralInformation: {
                    tourName: tourName,
                    totalDay: totalDay,
                    totalNight: totalNight,
                    addressList: mergeAddressList(),
                    tourPrice: tourPrice,
                    tourStatus: tourStatus.label,
                },
                mainImage: mainImage,
                additionalImages: additionalImages,
                tourSchedule: tourSchedule,
                daySummaries: daySummaries
            }

            console.log('update tour', tourData);
            let response = await updateTour(tourData);
            console.log("updateTour res: ", response);

            navigate('/tour');
            alert("Update Tour successfully!");
        }
    }
    useEffect(() => {
        getSelectedTour();
    }, [])
    const [mainImageUrl, setMainImageUrl] = useState(null);
    const [additionalImageUrls, setAdditionalImageUrls] = useState([]);
    const getSelectedTour = async () => {
        let res = await fetchTourById(tourId);
        if (res && res.data && res.data.EC === '0') {
            const selectedTourData = res.data.DT;
            console.log("selectedTourData", selectedTourData);
            console.log(tourName);

            // Tour General Information
            setTourName(selectedTourData.tourName);
            setTotalDay(selectedTourData.totalDay);
            setTotalNight(selectedTourData.totalNight);
            const addressListSplit = selectedTourData.addressList.split('|');
            const addressListAutoComplete = addressListSplit.map((item) => ({ label: item, value: item }));
            setAddressList(addressListAutoComplete);
            setTourPrice(selectedTourData.tourPrice);
            setTourStatus({ label: selectedTourData.tourStatus, value: selectedTourData.tourStatus });

            // Tour Image List
            setMainImageUrl(selectedTourData.mainImage);
            const additionalImageUrlsList = selectedTourData.TourAdditionalImages.map((item) => (item.additionalImage));
            setAdditionalImageUrls(additionalImageUrlsList);
            console.log(additionalImageUrls);

            // Tour Schedule
            const tourSchedules = selectedTourData.TourSchedules;

            if (Array.isArray(tourSchedules)) {
                const loadedTourSchedule = tourSchedules.map((schedule) => {
                    const packages = schedule.Packages;

                    if (Array.isArray(packages)) {
                        return packages.map((packageItem) => ({
                            label: packageItem.packageName, value: packageItem.id
                        }));
                    } else {
                        console.error("Invalid structure: packages is not an array");
                        return [];
                    }
                });

                const loadedDaySummaries = tourSchedules.map((schedule) => schedule.daySummary || "");

                setTourSchedule(loadedTourSchedule);
                setDaySummaries(loadedDaySummaries);
            } else {
                console.error("Invalid structure: tourSchedules is not an array");
            }
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
                <Link to='/tour' className='w-64 mb-4 text-md heading-color font-semibold btn-back p-2 cursor-pointer rounded-lg'>
                    <FaAngleDoubleLeft className='inline mr-2' />
                    <div className='inline'>Back to Tour Management</div>
                </Link>
                <div className='inline text-2xl heading-color font-bold text-center mb-4'>Update Tour</div>
                <div className='flex flex-wrap xl:gap-8 gap-4'>
                    <div className='flex-1 border border-blue-500 2xl:px-16 px-8 py-4 rounded-lg'>
                        <div className='text-lg font-semibold heading-color text-center'>Tour General Information</div>
                        <div className='mt-4'>
                            <TextField
                                value={tourName}
                                fullWidth
                                label='Tour name'
                                placeholder='Enter tour name'
                                onChange={handleTourName}
                                required />
                        </div>
                        <div className='mt-4 flex'>
                            <div className='flex-1 mr-2'>
                                <TextField
                                    value={totalDay}
                                    type='number'
                                    label='Total day'
                                    onChange={handleTotalDay}
                                    inputProps={{ min: 1 }}
                                    fullWidth
                                    required />
                            </div>
                            <div className='flex-1'>
                                <TextField
                                    value={totalNight}
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
                                value={addressList}
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
                                    value={tourPrice}
                                    type='money'
                                    label='Tour price'
                                    onChange={handleTourPrice}
                                    fullWidth
                                    required />
                            </div>
                            <div className='mt-4 flex-1'>
                                <Autocomplete
                                    value={tourStatus}
                                    id="tourStatus"
                                    options={TOUR_STATUS}
                                    onChange={handleTourStatus}
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} label="Tour Status" fullWidth required />}
                                />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <UpdateImageUploader
                                ref={imageUploaderRef}
                                fetchMainImageUrl={mainImageUrl}
                                fetchAdditionalImageUrls={additionalImageUrls}
                                onMainImageUpload={handleLoadMainImage}
                                onAdditionalImagesUpload={handleLoadAdditionalImages} />
                            <div className='w-72'></div>
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
                                            <Button className='!normal-case !text-xs !bg-red-300 !ml-2' variant="contained" color="secondary" onClick={(e) => handleRemoveDay(dayIndex, e.target.value)}>
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
                                                        options={packageListOptions}
                                                        onChange={(event, newValue) => handlePackageChange(dayIndex, packageIndex, newValue)}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label={`Package ${packageIndex + 1}`}

                                                            />
                                                        )}
                                                    />
                                                    <Button className='!normal-case !text-xs !bg-red-300' variant="contained" color="secondary" onClick={() => handleRemovePackage(dayIndex, packageIndex)}>
                                                        Remove
                                                    </Button>
                                                    <Button className='!normal-case !text-xs !bg-blue-300' variant="contained" color="primary" onClick={() => handleMovePackage(dayIndex, packageIndex, 'up')}>
                                                        Up
                                                    </Button>
                                                    <Button className='!normal-case !text-xs !bg-blue-300' variant="contained" color="primary" onClick={() => handleMovePackage(dayIndex, packageIndex, 'down')}>
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
                    <Button
                        className='!bg-green-500 !normal-case w-64 !bg-green-300 !mt-8 !mb-8'
                        variant="contained"
                        onClick={handleUpdateTour}>
                        Save
                    </Button>
                </div>
            </div>
        </>
    );
}

export default UpdateTour;
