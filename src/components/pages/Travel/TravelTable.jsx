import '../../styles/Table.css';
import React, { useEffect, useState } from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchBookingPagination } from '../../../services/bookingServices';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import ConfirmDialog from '../../custom/ConfirmDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import formatCurrency from '../../utils/formatCurrency';
function TravelTable(props) {
    const currentPage = props.currentPage;
    const currentLimit = props.currentLimit;
    const TABLE_HEADS = props.tableHeads;
    const TABLE_ROWS = props.tableRows;
    const [selectedTravel, setSelectedTravel] = useState();
    const [listTravelInBookingId, setListTravelInBookingId] = useState([]);

    useEffect(() => {
        fetchBooking();
    }, [])
    const fetchBooking = async () => {
        let res = await fetchBookingPagination(0, 0);
        if (res && res.data && res.data.EC === '0') {
            let listBooking = res.data.DT;
            console.log(listBooking);
            setListTravelInBookingId(listBooking.map((item) => (item.travelId)));
        }
    }
    const handleSelectTravel = async (travelData) => {
        setSelectedTravel(travelData);
    }

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };
    const handleConfirmDelete = () => {
        props.onDeleteTravel(selectedTravel); // Invoke the callback
        setConfirmDialogOpen(false);
        alert("Delete Travel successfully!");
    };

    const handleCancelDelete = () => {
        // Đóng Confirm Dialog khi người dùng hủy bỏ
        setConfirmDialogOpen(false);
    };
    const validateDelete = (travelId) => {
        if (listTravelInBookingId.includes(travelId)) {
            return false;
        }
        else {
            return true;
        }
    }
    const handleDeleteTravel = (travelData) => {
        if (validateDelete(travelData.id)) {
            setSelectedTravel(travelData);
            setConfirmDialogOpen(true);
        }
        else {
            setSnackbarMessage('Can not delete Travel existing in Booking');
            setOpenSnackbar(true);
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
            <ConfirmDialog
                open={confirmDialogOpen}
                title={'Confirm Delete'}
                content={`Do you want to delete this travel?`}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
            <table className="travel-table mt-4 w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEADS.map((head, index) => (
                            <th
                                key={head}
                                className="border-y border-blue-gray-100 p-4 transition-colors hover:bg-blue-50"
                            >
                                <div
                                    className="text-md flex items-center justify-between gap-2 font-semibold leading-none heading-color"
                                >
                                    {head}
                                </div>
                            </th>
                        ))}
                        <th
                            className="border-y border-blue-gray-100  p-4 transition-colors hover:bg-blue-50"
                        >
                            <div
                                className="text-md flex items-center justify-between gap-2 font-semibold leading-none heading-color">
                                Operations
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map(
                        (travelData, index) => {
                            return (
                                <tr key={travelData.id}>
                                    <td className="py-3 font-normal text-md pl-4 w-24!">
                                        {index + 1 + (currentPage - 1) * currentLimit}
                                    </td>
                                    <td className="font-normal text-md pl-4 w-64! truncate overflow-hidden">
                                        {travelData.id}
                                    </td>
                                    <td className="font-normal text-md pl-4 w-64! truncate overflow-hidden">
                                        {travelData.Tour.tourName}
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {dayjs(travelData.startDateTime).format("DD/MM/YYYY")}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {travelData.startLocation}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {formatCurrency(travelData.travelPrice)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {travelData.remainTicket + '/' + travelData.maxTicket}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-medium text-md pl-4 cursor-pointer hover:underline w-24!">
                                            <Link to={`/update-travel/${travelData.id}`}>
                                                <IconButton aria-label="edit" size="medium" color="primary" onClick={() => handleSelectTravel(travelData)}>
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>
                                            </Link>
                                            <IconButton aria-label="delete" size="medium" color="error" onClick={() => handleDeleteTravel(travelData)}>
                                                <DeleteIcon fontSize="inherit" />
                                            </IconButton>
                                        </div>
                                    </td>
                                </tr>
                            );
                        },
                    )}
                </tbody>
            </table>
        </>
    );
}

export default TravelTable;