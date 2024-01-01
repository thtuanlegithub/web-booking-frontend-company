import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TourTable from './TourTable';
import { deleteTour, fetchTourPagination } from '../../../services/tourServices';
import { Pagination } from '@mui/material';
function Tour(props) {
    const TABLE_HEADS = ['No.', 'Id', 'Tour Name', 'Total Day', 'Total Night', 'Price', 'Status'];
    const [listTour, setListTour] = useState([]);
    const [listTourSearch, setListTourSearch] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetchTours();
    }, [currentPage])
    const fetchTours = async () => {
        let response = await fetchTourPagination(currentPage, currentLimit);
        if (response && response.data && response.data.EC === '0') {
            setTotalPages(response.data.DT.totalPages);
            setListTour(response.data.DT.tours);
            setListTourSearch(response.data.DT.tours);
        }

    }
    const handleChange = (event, value) => {
        setCurrentPage(+value);
    }
    const handleDelete = async (tourData) => {
        await deleteTour(tourData);
        fetchTours(); // Call fetchTours to re-render the component
    }

    const [searchCategory, setSearchCategory] = useState(""); // Lưu trữ loại tìm kiếm
    const [searchText, setSearchText] = useState(""); // Lưu trữ từ khóa tìm kiếm
    const handleCategoryChange = (event, value) => {
        setSearchCategory(event.target.value);
        setCurrentPage(1); // Reset trang về trang đầu tiên khi thay đổi loại tìm kiếm
    };
    const handleSearch = (event) => {
        setSearchText(event.target.value);
        setCurrentPage(1); // Reset trang về trang đầu tiên khi thay đổi từ khóa tìm kiếm
    };
    useEffect(() => {
        if (searchCategory === 'Name') {
            const filteredTours = listTour.filter((item) => {
                // Lọc dựa trên tên của tour và từ khóa tìm kiếm
                const tourName = item['tourName'].toLowerCase(); // Đảm bảo không phân biệt hoa thường
                const searchLower = searchText.toLowerCase(); // Đảm bảo không phân biệt hoa thường
                return tourName.includes(searchLower);
            });
            setListTourSearch(filteredTours);
        }
        else if (searchCategory === 'Id') {
            const filteredTours = listTour.filter((item) => {
                // Lọc dựa trên id của tour và từ khóa tìm kiếm
                const tourId = String(item['id']); // Đảm bảo không phân biệt hoa thường
                return tourId.includes(searchText);
            });
            setListTourSearch(filteredTours);
        }
    }, [searchCategory, searchText])
    useEffect(() => {

    }, [listTourSearch])
    return (
        <div className='flex flex-col mx-8 2xl:mx-20'>
            <div className='flex flex-row justify-between my-4'>
                <div className="flex flex-1">
                    <select
                        onChange={handleCategoryChange}
                        defaultValue={""}
                        id="dropdown-button"
                        className="z-10 py-2.5 px-4 py-2 text-sm font-medium text-gray-900 bg-blue-100 border border-gray-300 rounded-s-lg focus:ring-2 focus:outline-none focus:ring-2" type="button">
                        <option value="" disabled>Select Categories</option>
                        <option value="Name">Tour Name</option>
                        <option value="Id">Tour Id</option>
                    </select>

                    <div className="relative w-72">
                        <input
                            onChange={handleSearch}
                            type="search" id="search-dropdown" className="block p-2.5 pl-4 w-full h-full z-20 text-sm focus:outline-none focus:border-blue-600 border border-blue-gray-100 placeholder-blue-300 text-blue-800 font-medium rounded-e-lg focus:ring-1" placeholder="Search ..." required />
                        <button type="submit" className="absolute top-0 end-0 p-2.5 pr-4 text-sm font-medium h-full text-white bg-blue-800 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only ml-2">Search</span>
                        </button>
                    </div>
                </div>
                <Link to='/create-tour' className='primary-button p-2 rounded-lg text-md font-medium px-6'>
                    Create Tour
                </Link>
            </div>
            <TourTable
                tableHeads={TABLE_HEADS}
                tableRows={listTourSearch}
                currentPage={currentPage}
                currentLimit={currentLimit}
                onDeleteTour={handleDelete} />
            {totalPages > 0 &&
                <Pagination className='absolute bottom-10 left-1/2 transform -translate-x-1/2 ' count={+totalPages} page={+currentPage} onChange={handleChange} color="primary" variant="outlined" size="large" />
            }
        </div>

    );
}

export default Tour;
