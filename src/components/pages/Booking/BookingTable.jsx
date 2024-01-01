import '../../styles/Table.css';
import React, { useState } from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchBookingById } from '../../../services/bookingServices';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import ConfirmDialog from '../../custom/ConfirmDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
function BookingTable(props) {
    const currentPage = props.currentPage;
    const currentLimit = props.currentLimit;
    const TABLE_HEADS = props.tableHeads;
    const TABLE_ROWS = props.tableRows;
    const [selectedBooking, setSelectedBooking] = useState(null);
    const handleSelectBooking = async (bookingData) => {
        setSelectedBooking(bookingData);
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
        props.onDeleteBooking(selectedBooking); // Invoke the callback
        setConfirmDialogOpen(false);
        alert("Delete Booking successfully!");
    };

    const handleCancelDelete = () => {
        // Đóng Confirm Dialog khi người dùng hủy bỏ
        setConfirmDialogOpen(false);
    };
    const validateDelete = (bookingData) => {
        if (bookingData.exportInvoice) {
            return false;
        }
        else {
            return true;
        }
    }
    const handleDeleteBooking = (bookingData) => {
        if (validateDelete(bookingData)) {
            setSelectedBooking(bookingData);
            setConfirmDialogOpen(true);
        }
        else {
            setSnackbarMessage('Can not delete Completed Booking');
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
                content={`Do you want to delete this booking?`}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
            <table className="booking-table mt-4 w-full min-w-max table-auto text-left text-wrap">
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
                        (bookingData, index) => {
                            return (
                                <tr key={bookingData.id}>
                                    <td className="py-3 font-normal text-md pl-4 w-24!">
                                        {index + 1 + (currentPage - 1) * currentLimit}
                                    </td>
                                    <td className="py-3 font-normal text-md pl-4 w-24!">
                                        {bookingData.id}
                                    </td>
                                    <td className="font-normal text-md pl-4 w-64! truncate overflow-hidden">
                                        {bookingData.Customer.customerName}
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {bookingData.travelId}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {dayjs(bookingData.createdAt).format('DD/MM/YYYY HH:mm A')}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {bookingData.bookingPrice}
                                        </div>
                                    </td>
                                    <td>
                                        {
                                            bookingData.exportInvoice == true &&
                                            <div className="font-medium inline ml-2 text-md px-4 w-48! bg-green-100 py-2 rounded-lg">
                                                Completed
                                            </div> ||
                                            <div className="font-medium inline ml-2 text-md px-4 w-48! bg-red-100 py-2 rounded-lg">
                                                Incompleted
                                            </div>
                                        }

                                    </td>
                                    <td>
                                        <div className="font-medium text-md pl-4 cursor-pointer hover:underline w-24!">
                                            <Link to={`/update-booking/${bookingData.id}`}>
                                                <IconButton aria-label="edit" size="medium" color="primary" onClick={() => handleSelectBooking(bookingData)}>
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>
                                            </Link>
                                            <IconButton aria-label="delete" size="medium" color="error" onClick={() => handleDeleteBooking(bookingData)}>
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

export default BookingTable;