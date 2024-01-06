import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import BookingTable from './BookingTable';
import { deleteBooking, fetchBookingPagination } from '../../../services/bookingServices';
import { Pagination } from '@mui/material';
import ConfirmDialog from '../../custom/ConfirmDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
function Booking(props) {
    const TABLE_HEADS = ['No.', 'Id', 'Customer Name', 'Travel Id', 'Booking Date', 'Total Price', 'Status'];
    const [listBooking, setListBooking] = useState([]);
    const [listBookingSearch, setListBookingSearch] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetchBookings();
    }, [currentPage])
    const fetchBookings = async () => {
        let response = await fetchBookingPagination(currentPage, currentLimit);
        if (response && response.data && response.data.EC === '0') {
            setTotalPages(response.data.DT.totalPages);
            setListBooking(response.data.DT.bookings);
            setListBookingSearch(response.data.DT.bookings);
            console.log(response.data.DT.bookings);
        }

    }
    const handleChange = (event, value) => {
        setCurrentPage(+value);
    }
    const handleDelete = async (bookingData) => {
        await deleteBooking(bookingData);
        fetchBookings(); // Call fetchBookings to re-render the component
    }
    const [searchCategory, setSearchCategory] = useState("Name"); // Lưu trữ loại tìm kiếm
    const [searchText, setSearchText] = useState(""); // Lưu trữ từ khóa tìm kiếm
    const handleCategoryChange = (event, value) => {
        setSearchCategory(event.target.value);
        setCurrentPage(1); // Reset trang về trang đầu tiên khi thay đổi loại tìm kiếm
    };
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    const handleSearch = (event) => {
        if (event.target.value.length > 100) {
            setSnackbarMessage('Search Text Field max length is 100');
            setOpenSnackbar(true);
        }
        else {
            setSearchText(event.target.value);
            setCurrentPage(1); // Reset trang về trang đầu tiên khi thay đổi từ khóa tìm kiếm
        }
    };
    useEffect(() => {
        if (searchCategory === 'Name') {
            const filteredBookings = listBooking.filter((item) => {
                // Lọc dựa trên tên của customer và từ khóa tìm kiếm
                const customerName = item['Customer']['customerName'].toLowerCase(); // Đảm bảo không phân biệt hoa thường
                const searchLower = searchText.toLowerCase(); // Đảm bảo không phân biệt hoa thường
                return customerName.includes(searchLower);
            });
            setListBookingSearch(filteredBookings);
        }
        else if (searchCategory === 'Id') {
            const filteredBookings = listBooking.filter((item) => {
                // Lọc dựa trên id của booking và từ khóa tìm kiếm
                const bookingId = String(item['id']); // Đảm bảo không phân biệt hoa thường
                return bookingId.includes(searchText);
            });
            setListBookingSearch(filteredBookings);
        }
    }, [searchCategory, searchText])
    useEffect(() => {

    }, [listBookingSearch])
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
                content={`Do you want to delete this package?`}
            />
            <div className='flex flex-col mx-8 2xl:mx-20'>
                <div className='flex flex-row justify-between my-4'>
                    <div className="flex flex-1">
                        <select
                            onChange={handleCategoryChange}
                            defaultValue={"Name"}
                            id="dropdown-button"
                            className="z-10 py-2.5 px-4 py-2 text-sm font-medium text-gray-900 bg-blue-100 border border-gray-300 rounded-s-lg focus:ring-2 focus:outline-none focus:ring-2"
                            type="button">
                            <option value="" disabled>Select Categories</option>
                            <option value="Name">Customer Name</option>
                            <option value="Id">Booking Id</option>
                        </select>
                        <div className="relative w-72">
                            <input
                                value={searchText}
                                onChange={handleSearch}
                                type="search"
                                id="search-dropdown"
                                className="block p-2.5 pl-4 w-full h-full z-20 text-sm focus:outline-none focus:border-blue-600 border border-blue-gray-100 placeholder-blue-300 text-blue-800 font-medium rounded-e-lg focus:ring-1" placeholder="Search ..." required />
                        </div>
                    </div>
                    <Link to='/create-booking' className='primary-button p-2 rounded-lg text-md font-medium px-6'>
                        Create Booking
                    </Link>
                </div>
                <BookingTable
                    tableHeads={TABLE_HEADS}
                    tableRows={listBookingSearch}
                    currentPage={currentPage}
                    currentLimit={currentLimit}
                    onDeleteBooking={handleDelete} />
                {totalPages > 0 &&
                    <Pagination className='absolute bottom-10 left-1/2 transform -translate-x-1/2 ' count={+totalPages} page={+currentPage} onChange={handleChange} color="primary" variant="outlined" size="large" />
                }
            </div>
        </>

    );
}

export default Booking;
