import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TravelTable from './TravelTable';
import { deleteTravel, fetchTravelPagination } from '../../../services/travelServices';
import { Pagination } from '@mui/material';
function Travel(props) {
    const TABLE_HEADS = ['No.', 'Tour Name', 'Start Day', 'Start Location', 'Price', 'Remain'];
    const TABLE_ROWS = [
        {
            id: 1,
            tourName: 'Tour 1',
            startDay: '01/01/2024',
            startLocation: 10000000,
            travelPrice: 1,
            remain: '0/50'
        },
        {
            id: 2,
            tourName: 'Tour 2',
            startDay: '01/01/2024',
            startLocation: 10000000,
            travelPrice: 1,
            remain: '0/50'
        }];
    const [listTravel, setListTravel] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetchTravels();
    }, [currentPage])
    const fetchTravels = async () => {
        let response = await fetchTravelPagination(currentPage, currentLimit);
        if (response && response.data && response.data.EC === '0') {
            setTotalPages(response.data.DT.totalPages);
            setListTravel(response.data.DT.travels);
            console.log(response.data.DT.travels);
        }

    }
    const handleChange = (event, value) => {
        setCurrentPage(+value);
    }
    const handleDelete = async (travelData) => {
        await deleteTravel(travelData);
        fetchTravels(); // Call fetchTravels to re-render the component
    }
    return (
        <div className='flex flex-col mx-8 2xl:mx-20'>
            <div className='flex flex-row justify-between my-4'>
                <div className="flex flex-1">
                    <select defaultValue={""} id="dropdown-button" className="z-10 py-2.5 px-4 py-2 text-sm font-medium text-gray-900 bg-blue-100 border border-gray-300 rounded-s-lg focus:ring-2 focus:outline-none focus:ring-2" type="button">
                        <option value="" disabled>Select Categories</option>
                        <option value="Name">Travel Name</option>
                        <option value="Id">Travel Id</option>
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
                <Link to='/create-travel' className='primary-button p-2 rounded-lg text-md font-medium px-6'>
                    Create Travel
                </Link>
            </div>
            <TravelTable
                tableHeads={TABLE_HEADS}
                tableRows={listTravel}
                currentPage={currentPage}
                currentLimit={currentLimit}
                onDeleteTravel={handleDelete} />
            {totalPages > 0 &&
                <Pagination className='absolute bottom-10 left-1/2 transform -translate-x-1/2 ' count={+totalPages} page={+currentPage} onChange={handleChange} color="primary" variant="outlined" size="large" />
            }
        </div>

    );
}

export default Travel;
