import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import CustomerTable from './CustomerTable';
import { deleteCustomer, fetchCustomerPagination } from '../../../services/customerServices';
import { Pagination } from '@mui/material';
function Customer(props) {
    const TABLE_HEADS = ['No.', 'Id', 'Customer Name', 'Email', 'Phone', 'Account Id'];
    const [listCustomer, setListCustomer] = useState([]);
    const [listCustomerSearch, setListCustomerSearch] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetchCustomers();
    }, [currentPage])
    const fetchCustomers = async () => {
        let response = await fetchCustomerPagination(currentPage, currentLimit);
        if (response && response.data && response.data.EC === '0') {
            setTotalPages(response.data.DT.totalPages);
            setListCustomer(response.data.DT.customers);
            setListCustomerSearch(response.data.DT.customers);
        }

    }
    const handleChange = (event, value) => {
        setCurrentPage(+value);
    }
    const handleDelete = async (customerData) => {
        await deleteCustomer(customerData);
        fetchCustomers(); // Call fetchCustomers to re-render the component
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
            const filteredCustomers = listCustomer.filter((item) => {
                // Lọc dựa trên tên của customer và từ khóa tìm kiếm
                const customerName = item['customerName'].toLowerCase(); // Đảm bảo không phân biệt hoa thường
                const searchLower = searchText.toLowerCase(); // Đảm bảo không phân biệt hoa thường
                return customerName.includes(searchLower);
            });
            setListCustomerSearch(filteredCustomers);
        }
        else if (searchCategory === 'Id') {
            const filteredCustomers = listCustomer.filter((item) => {
                // Lọc dựa trên id của customer và từ khóa tìm kiếm
                const customerId = String(item['id']); // Đảm bảo không phân biệt hoa thường
                return customerId.includes(searchText);
            });
            setListCustomerSearch(filteredCustomers);
        }
    }, [searchCategory, searchText])
    useEffect(() => {

    }, [listCustomerSearch])
    return (
        <div className='flex flex-col mx-8 2xl:mx-20'>
            <div className='flex flex-row justify-between my-4'>
                <div className="flex flex-1">
                    <select
                        onChange={handleCategoryChange}
                        defaultValue={""} id="dropdown-button" className="z-10 py-2.5 px-4 py-2 text-sm font-medium text-gray-900 bg-blue-100 border border-gray-300 rounded-s-lg focus:ring-2 focus:outline-none focus:ring-2" type="button">
                        <option value="" disabled>Select Categories</option>
                        <option value="Name">Customer Name</option>
                        <option value="Id">Customer Id</option>
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
            </div>
            <CustomerTable
                tableHeads={TABLE_HEADS}
                tableRows={listCustomerSearch}
                currentPage={currentPage}
                currentLimit={currentLimit}
                onDeleteCustomer={handleDelete} />
            {totalPages > 0 &&
                <Pagination className='absolute bottom-10 left-1/2 transform -translate-x-1/2 ' count={+totalPages} page={+currentPage} onChange={handleChange} color="primary" variant="outlined" size="large" />
            }
        </div>

    );
}

export default Customer;
