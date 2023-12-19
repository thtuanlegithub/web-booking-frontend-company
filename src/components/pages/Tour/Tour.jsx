import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TourTable from './TourTable';
import { deleteTour, fetchTourPagination } from '../../../services/tourServices';
import { Pagination } from '@mui/material';
function Tour(props) {
    const TABLE_HEADS = ['No', 'Tour Name', 'Total Day', 'Total Night', 'Price', 'Status'];
    const TABLE_ROWS = [
        {
            id: 1,
            tourName: 'Tour 1',
            totalDay: 1,
            totalNight: 1,
            tourPrice: 10000000,
            tourStatus: 'completed'
        },
        {
            id: 2,
            tourName: 'Tour 2',
            totalDay: 1,
            totalNight: 1,
            tourPrice: 10000000,
            tourStatus: 'incompleted'
        }];
    const [listTour, setListTour] = useState([]);
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
        }

    }
    const handleChange = (event, value) => {
        setCurrentPage(+value);
    }
    const handleDelete = async (tourData) => {
        await deleteTour(tourData);
        fetchTours(); // Call fetchTours to re-render the component
    }
    return (
        <div className='flex flex-col mx-8 2xl:mx-20'>
            <div className='flex flex-row justify-between my-4'>
                <div className="flex flex-1">
                    <select defaultValue={""} id="dropdown-button" className="z-10 py-2.5 px-4 py-2 text-sm font-medium text-gray-900 bg-blue-100 border border-gray-300 rounded-s-lg focus:ring-2 focus:outline-none focus:ring-2" type="button">
                        <option value="" disabled>Select Categories</option>
                        <option value="Name">Tour Name</option>
                        <option value="Id">Tour Id</option>
                    </select>
                    <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                            </li>
                            <li>
                                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                            </li>
                        </ul>
                    </div>
                    <div className="relative w-72">
                        <input type="search" id="search-dropdown" className="block p-2.5 pl-4 w-full h-full z-20 text-sm focus:outline-none focus:border-blue-600 border border-blue-gray-100 placeholder-blue-300 text-blue-800 font-medium rounded-e-lg focus:ring-1" placeholder="Search ..." required />
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
                tableRows={listTour}
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
