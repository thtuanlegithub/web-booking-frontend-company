import React from 'react';
import '../styles/Package.css';
import { FaPlusCircle } from 'react-icons/fa';
import { Button } from '@material-tailwind/react';
import PackageTable from '../custom/PackageTable';
import PackageModal from '../custom/PackageModal';
function Package(props) {
    const TABLE_HEADS = ['Id', 'Package Name', 'Package Type', 'Address'];
    const TABLE_ROWS = [{
        id: 1,
        packageName: 'Tham quan vườn hoa Đà Lạt',
        packageType: 'Tham quan',
        packageAddress: 'Đà Lạt'
    },
    {
        id: 1,
        packageName: 'Tham quan vườn hoa Đà Lạt',
        packageType: 'Tham quan',
        packageAddress: 'Đà Lạt'
    },
    {
        id: 2,
        packageName: 'Tham quan vườn hoa Đà Lạt',
        packageType: 'Tham quan',
        packageAddress: 'Đà Lạt'
    },
    {
        id: 3,
        packageName: 'Tham quan vườn hoa Đà Lạt',
        packageType: 'Tham quan',
        packageAddress: 'Đà Lạt'
    },
    {
        id: 4,
        packageName: 'Tham quan vườn hoa Đà Lạt',
        packageType: 'Tham quan',
        packageAddress: 'Đà Lạt'
    },
    ]
    return (
        <div className='flex flex-col'>
            <div className='flex-1 flex flex-row justify-between mx-8 my-4'>
                <div className="flex flex-1">
                    <select id="dropdown-button" className="z-10 py-2.5 px-4 py-2 text-sm font-medium text-gray-900 bg-blue-100 border border-gray-300 rounded-s-lg focus:ring-2 focus:outline-none focus:ring-2" type="button">
                        <option value="" selected disabled>Select Categories</option>
                        <option value="Name">Package Name</option>
                        <option value="Id">Package Id</option>
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
                <div className='flex-1 inter-font'>
                    <PackageModal title="Create Package" />
                </div>
            </div>
            <div className='flex-1 mx-8 my-4'>
                <PackageTable tableHeads={TABLE_HEADS} tableRows={TABLE_ROWS} />
                {/* <SortableTable /> */}
            </div>
        </div>
    );
}

export default Package;