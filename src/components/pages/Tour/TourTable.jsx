import '../../styles/Table.css';
import React, { useEffect, useState } from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../../custom/ConfirmDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { fetchTravelPagination } from '../../../services/travelServices';
import formatCurrency from '../../utils/formatCurrency';
function TourTable(props) {
    const currentPage = props.currentPage;
    const currentLimit = props.currentLimit;
    const TABLE_HEADS = props.tableHeads;
    const TABLE_ROWS = props.tableRows;
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [selectedTour, setSelectedTour] = useState();
    const [listTourInTravelId, setListTourInTravelId] = useState([]);
    useEffect(() => {
        fetchTravel();
    }, [])
    const fetchTravel = async () => {
        let res = await fetchTravelPagination(0, 0);
        if (res && res.data && res.data.EC === '0') {
            let listTravel = res.data.DT;
            setListTourInTravelId(listTravel.map((item) => (item.Tour.id)));
        }
    }
    const handleSelectTour = async (tourData) => {
        setSelectedTour(tourData);
    }
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };
    const handleConfirmDelete = () => {
        props.onDeleteTour(selectedTour); // Invoke the callback
        setConfirmDialogOpen(false);
        alert("Delete Tour successfully");
    };
    const handleCancelDelete = () => {
        // Đóng Confirm Dialog khi người dùng hủy bỏ
        setConfirmDialogOpen(false);
    };
    const validateDelete = (tourId) => {
        if (listTourInTravelId.includes(tourId)) {
            return false;
        }
        else {
            return true;
        }
    }
    const handleDeleteTour = (tourData) => {
        if (validateDelete(tourData.id)) {
            setSelectedTour(tourData);
            setConfirmDialogOpen(true);
        }
        else {
            setSnackbarMessage('Can not delete Tour existing in Travel');
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
                content={`Do you want to delete this tour?`}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
            <table className="tour-table mt-4 w-full min-w-max table-auto text-left">
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
                        (tourData, index) => {
                            return (
                                <tr key={tourData.id}>
                                    <td className="py-3 font-normal text-md pl-4 w-24!">
                                        {index + 1 + (currentPage - 1) * currentLimit}
                                    </td>
                                    <td className="font-normal text-md pl-4 w-64! truncate overflow-hidden">
                                        {tourData.id}
                                    </td>
                                    <td className="font-normal text-md pl-4 w-64! truncate overflow-hidden">
                                        {tourData.tourName}
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {tourData.totalDay}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {tourData.totalNight}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {formatCurrency(tourData.tourPrice)}
                                        </div>
                                    </td>
                                    <td>
                                        {tourData.tourStatus === 'Completed' &&
                                            <div className="font-normal text-md inline !font-medium bg-green-100 rounded-lg py-2 px-4 mx-1">
                                                {tourData.tourStatus}
                                            </div>
                                            ||
                                            <div className="font-normal text-md inline !font-medium bg-red-100 rounded-lg py-2 px-4 mx-1">
                                                {tourData.tourStatus}
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        <div className="font-medium text-md pl-4 cursor-pointer hover:underline w-24!">
                                            <Link to={`/update-tour/${tourData.id}`}>
                                                <IconButton aria-label="edit" size="medium" color="primary" onClick={() => handleSelectTour(tourData)}>
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>
                                            </Link>
                                            <IconButton aria-label="delete" size="medium" color="error" onClick={() => handleDeleteTour(tourData)}>
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

export default TourTable;