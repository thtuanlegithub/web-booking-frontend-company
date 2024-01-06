import Modal from 'react-modal';
import Select from 'react-select';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { PACKAGE_TYPES } from '../../../lib/consts/packageTypes';
import { PACKAGE_ADDRESSES } from '../../../lib/consts/packageAddresses';
import '../../styles/CustomModal.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const customStyles = {
    content: {
        top: '35%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '15px',
    },
};
function PackageModal(props) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    // Modal - Open - Close - Process
    const [modalIsOpen, setIsOpen] = React.useState(props.displayModal);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        // setIsOpen(false);
        props.onCloseModal();
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.

    }


    // Package Name
    const [packageName, setPackageName] = useState(null);
    const [packageType, setPackageType] = useState(null);
    const [packageAddress, setPackageAddress] = useState(null);
    const [packageDescription, setPackageDescription] = useState("");
    // Clear Input
    const clearInput = () => {
        setPackageName("");
        setPackageType(null);
        setPackageAddress(null);
        setPackageDescription("");
    }
    useEffect(() => {
        if (props.action === 'UPDATE') {
            setPackageName(props.packageData.packageName);
            setPackageType({ label: props.packageData.packageType, value: props.packageData.packageType });
            setPackageAddress({ label: props.packageData.packageAddress, value: props.packageData.packageAddress });
            setPackageDescription(props.packageData.packageDescription);
        }
        else {
            clearInput();
        }
    }, [props.packageData, props.action])

    // Handle Input
    const handlePackageName = (event) => {
        if (event.target.value.length > 100) {
            setSnackbarMessage('Package Name max length is 100');
            setOpenSnackbar(true);
        }
        else {
            setPackageName(event.target.value);
        }
    }
    const handlePackageDescription = (event) => {
        if (event.target.value.length > 500) {
            setSnackbarMessage('Package Description max length is 500');
            setOpenSnackbar(true);
        }
        else {
            setPackageDescription(event.target.value);
        }
    }
    const handlePackageType = (selectedOption) => {
        if (selectedOption === null) {
            setPackageType(null);
        }
        else {
            setPackageType(selectedOption);
        }

    }
    const handlePackageAddress = (selectedOption) => {
        if (selectedOption === null) {
            setPackageAddress(null);
        }
        else {
            setPackageAddress(selectedOption);
        }
    }



    // Validate input
    const validateInput = () => {
        if (packageName == null || packageName == '') {
            setSnackbarMessage('Package Name has to be filled');
            setOpenSnackbar(true);
            return false;
        }
        if (packageType == null) {
            setSnackbarMessage('Package Type has to be filled');
            setOpenSnackbar(true);
            return false;
        }
        if (packageAddress == null) {
            setSnackbarMessage('Package Address has to be filled');
            setOpenSnackbar(true);
            return false;
        }
        return true;
    }
    const handleUpdatePackage = async () => {
        // validate input
        if (validateInput()) {
            const packageData = {
                id: props.packageData.id,
                packageName: packageName,
                packageType: packageType.value,
                packageAddress: packageAddress.value,
                packageDescription: packageDescription
            }
            props.onUpdatePackage(packageData);
            clearInput();
            closeModal();
            alert("Update Package successfully!");

        }
        else {
            // open warning dialog
        }
    }
    const handleCreatePackage = async () => {
        // validate input
        if (validateInput()) {
            const packageData = {
                packageName: packageName,
                packageType: packageType.value,
                packageAddress: packageAddress.value,
                packageDescription: packageDescription
            }
            props.onCreatePackage(packageData);
            clearInput();
            closeModal();
            alert("Create Package successfully!");
        }
        else {
            // open warning dialog
        }
    }
    // Select Input
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    return (
        <div>

            <Modal
                appElement={document.getElementById('root')}
                isOpen={props.displayModal}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                overlayClassName="modal-overlay"
                style={customStyles}
            >
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
                <form className='mx-8 my-4'>
                    <div className='heading-color text-xl font-bold block text-center'>
                        {props.action === 'CREATE' ? 'Create Package' : 'Update Package'}
                    </div>
                    <div className="mt-4 w-96 m-auto">
                        <label className='text-blue-800 font-medium text-md' htmlFor='packageName'>Package Name</label>
                        <div className="relative flex w-full flex-wrap items-stretch mt-1">
                            <input
                                readOnly={props.action === 'UPDATE'}
                                autoComplete='off'
                                value={packageName}
                                onChange={handlePackageName}
                                id='packageName'
                                type="text"
                                placeholder="Enter package name"
                                className="py-3 placeholder:font-normal placeholder-gray-500 relative bg-white bg-white rounded-lg text-md border border-gray-400 outline-none focus:border-blue-500 focus:border-2 w-full pl-4" required />
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className="mt-4 w-44 m-auto">
                            <label className='text-blue-800 font-medium text-md' htmlFor='packageType'>Package Type</label>
                            <div className="relative flex w-full flex-wrap items-stretch mt-1">
                                <Select
                                    value={packageType}
                                    onChange={handlePackageType}
                                    className="basic-single text-md w-64"
                                    classNamePrefix="select"
                                    defaultValue="=Select-"
                                    isDisabled={isDisabled}
                                    isLoading={isLoading}
                                    isClearable={isClearable}
                                    isSearchable={isSearchable}
                                    name="PackageType"
                                    options={PACKAGE_TYPES}
                                />
                            </div>
                        </div>
                        <div className="mt-4 ml-4 w-48 m-auto">
                            <label className='text-blue-800 font-medium text-md' htmlFor='packageCity'>Package Address</label>
                            <div className="relative flex w-full flex-wrap items-stretch mt-1">
                                <Select
                                    value={packageAddress}
                                    onChange={handlePackageAddress}
                                    className="basic-single text-md w-64"
                                    classNamePrefix="select"
                                    defaultValue="=Select-"
                                    isDisabled={isDisabled}
                                    isLoading={isLoading}
                                    isClearable={isClearable}
                                    isSearchable={isSearchable}
                                    name="packageAddress"
                                    options={PACKAGE_ADDRESSES}

                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 w-96 m-auto">
                        <label className='text-blue-800 font-medium text-md' htmlFor='packageDescription'>Package Description</label>
                        <div className="relative flex w-full flex-wrap items-stretch mt-1">
                            <textarea
                                value={packageDescription}
                                onChange={handlePackageDescription}
                                rows="4" style={{ resize: "none" }} autoComplete='off' id='packapackageDescriptiongeName' type="text" placeholder="Enter package description"
                                className="py-3 placeholder:font-normal placeholder-gray-500 relative bg-white bg-white rounded-lg text-md border border-gray-400 outline-none focus:border-blue-500 focus:border-2 w-full pl-4" />
                        </div>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <input className='btn-red mt-4 p-2 rounded-lg text-md font-medium px-6 float-left' type='button' value='Close' onClick={closeModal} />
                        <input className='btn-green mt-4 p-2 rounded-lg text-md font-medium px-6 float-right' type='button' value='Save' onClick={props.action === 'CREATE' ? handleCreatePackage : handleUpdatePackage} />
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default PackageModal;