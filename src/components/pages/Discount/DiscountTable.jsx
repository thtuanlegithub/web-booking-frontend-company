import '../../styles/Table.css';
import React, { useEffect, useState } from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchDiscountById } from '../../../services/discountServices';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchTravelPagination } from '../../../services/travelServices';
import ConfirmDialog from '../../custom/ConfirmDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
function DiscountTable(props) {
    const currentPage = props.currentPage;
    const currentLimit = props.currentLimit;
    const TABLE_HEADS = props.tableHeads;
    const TABLE_ROWS = props.tableRows;
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const handleSelectDiscount = async (discountData) => {
        setSelectedDiscount(discountData);
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
        props.onDeleteTravel(selectedDiscount); // Invoke the callback
        setConfirmDialogOpen(false);
        alert("Delete Discount successfully!");
    };

    const handleCancelDelete = () => {
        // Đóng Confirm Dialog khi người dùng hủy bỏ
        setConfirmDialogOpen(false);
    };
    const [listDiscountInTravelId, setListDiscountInTravelId] = useState([]);
    useEffect(() => {
        fetchListTravel();
    }, [])
    const fetchListTravel = async () => {
        let res = await fetchTravelPagination(0, 0);
        if (res && res.data && res.data.EC === '0') {
            let listTravel = res.data.DT;
            console.log(listTravel);
            setListDiscountInTravelId(listTravel.map((item) => (item.discountId)));
        }
    }
    const validateDelete = (discountId) => {
        if (listDiscountInTravelId.includes(discountId)) {
            alert("Cannot delete Discount existing in Travel");
            return false;
        }
        else {
            return true;
        }
    }
    const handleDeleteDiscount = (discountData) => {
        if (validateDelete(discountData.id) === true) {
            setConfirmDialogOpen(true);
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
                content={`Do you want to delete this discount?`}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
            <table className="discount-table mt-4 w-full min-w-max table-auto text-left text-wrap">
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
                        (discountData, index) => {
                            return (
                                <tr key={discountData.id}>
                                    <td className="py-3 font-normal text-md pl-4 w-24!">
                                        {index + 1 + (currentPage - 1) * currentLimit}
                                    </td>
                                    <td className="font-normal text-md pl-4 w-64! truncate overflow-hidden">
                                        {discountData.id}
                                    </td>
                                    <td className="font-normal text-md pl-4 w-64! truncate overflow-hidden">
                                        {discountData.discountName}
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {discountData.discountType}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {discountData.discountType === 'Percentage' &&
                                                discountData.discountAmount + "%" ||
                                                discountData.discountAmount}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {discountData.Travels.length}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-medium text-md pl-4 cursor-pointer hover:underline w-24!">
                                            <Link to={`/update-discount/${discountData.id}`}>
                                                <IconButton aria-label="edit" size="medium" color="primary" onClick={() => handleSelectDiscount(discountData)}>
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>
                                            </Link>
                                            <IconButton aria-label="delete" size="medium" color="error" onClick={() => handleDeleteDiscount(discountData)}>
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

export default DiscountTable;