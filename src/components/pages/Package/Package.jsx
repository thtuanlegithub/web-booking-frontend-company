import '../../styles/Package.css';
import React, { useEffect, useState, useRef } from 'react';
import PackageTable from './PackageTable';
import PackageModal from './PackageModal';
import { createPackage, updatePackage, deletePackage, fetchPackagePagination } from '../../../services/packageServices';
import Pagination from '@mui/material/Pagination';
const TABLE_HEADS = ['No.', 'Id', 'Package Name', 'Package Type', 'Address'];
function Package(props) {
    const [isDisplayModal, setIsDisplayModal] = useState(false);
    const [listPackage, setListPackage] = useState([]);
    const [listPackageSearch, setListPackageSearch] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [actionPackageModal, setActionPackageModal] = useState("CREATE");
    const [selectedPackage, setSelectedPackage] = useState({});
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
            const filteredPackages = listPackage.filter((item) => {
                // Lọc dựa trên tên của package và từ khóa tìm kiếm
                const packageName = item['packageName'].toLowerCase(); // Đảm bảo không phân biệt hoa thường
                const searchLower = searchText.toLowerCase(); // Đảm bảo không phân biệt hoa thường
                return packageName.includes(searchLower);
            });
            setListPackageSearch(filteredPackages);
        }
        else if (searchCategory === 'Id') {
            const filteredPackages = listPackage.filter((item) => {
                // Lọc dựa trên tên của package và từ khóa tìm kiếm
                const packageId = String(item['id']); // Đảm bảo không phân biệt hoa thường
                return packageId.includes(searchText);
            });
            setListPackageSearch(filteredPackages);
        }
    }, [searchCategory, searchText])
    useEffect(() => {

    }, [listPackageSearch])
    useEffect(() => {
        fetchPackages();
    }, [currentPage]);
    const fetchPackages = async () => {
        let response = await fetchPackagePagination(currentPage, currentLimit);
        if (response && response.data && response.data.EC === '0') {
            console.log(response.data.DT);
            setTotalPages(response.data.DT.totalPages);
            setListPackage(response.data.DT.packages);
            setListPackageSearch(response.data.DT.packages);
        }
    }
    const handleCreate = async (packageData) => {
        let res = await createPackage(packageData);
        fetchPackages();
    }
    const handleUpdate = async (packageData) => {
        // validate
        let res = await updatePackage(packageData);
        fetchPackages();
    }
    const handleOpenCreateModal = () => {
        setActionPackageModal("CREATE");
        setIsDisplayModal(true);
    }
    const handleCloseModal = () => {
        setIsDisplayModal(false);
    }
    const handleSelectPackage = (packageData) => {
        console.log(">>> selected", packageData);
        setActionPackageModal("UPDATE");
        setSelectedPackage(packageData);
        setIsDisplayModal(true);
    }
    const handleDelete = async (packageData) => {
        await deletePackage(packageData);
        fetchPackages(); // Call fetchPackages to re-render the component
    }
    const handleChange = (event, value) => {
        setCurrentPage(+value);
    }
    let PACKAGE_TYPES = [];
    useEffect(() => {
        fetch('../../../../package_type.json')
            .then(response => response.json())
            .then(data => {
                PACKAGE_TYPES = data;
            })
            .catch(error => console.error("Error fetching JSON: ", error));
    }, [])
    return (
        <>
            <div className='flex flex-col h-full mx-8 2xl:mx-20'>
                <div className='flex flex-row justify-between my-4'>
                    <div className="flex flex-1">
                        <select
                            onChange={handleCategoryChange}
                            defaultValue={""}
                            id="dropdown-button"
                            className="z-10 py-2.5 px-4 py-2 text-sm font-medium text-gray-900 bg-blue-100 border border-gray-300 rounded-s-lg focus:ring-2 focus:outline-none focus:ring-2"
                            type="button">
                            <option value="" disabled>Select Categories</option>
                            <option value="Name">Package Name</option>
                            <option value="Id">Package Id</option>
                        </select>
                        <div className="relative w-72">
                            <input
                                onChange={handleSearch}
                                type="search"
                                id="search-dropdown"
                                className="block p-2.5 pl-4 w-full h-full z-20 text-sm focus:outline-none focus:border-blue-600 border border-blue-gray-100 placeholder-blue-300 text-blue-800 font-medium rounded-e-lg focus:ring-1" placeholder="Search ..." required />
                            <button type="submit" className="absolute top-0 end-0 p-2.5 pr-4 text-sm font-medium h-full text-white bg-blue-800 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only ml-2">Search</span>
                            </button>
                        </div>
                    </div>
                    <div className='flex-1 inter-font'>
                        <input
                            className='primary-button p-2 rounded-lg text-md font-medium px-6 float-right'
                            type='button'
                            onClick={handleOpenCreateModal}
                            value='Create package' />
                        <PackageModal
                            displayModal={isDisplayModal}
                            onCloseModal={handleCloseModal}
                            packageTypes={PACKAGE_TYPES}
                            onCreatePackage={handleCreate}
                            onUpdatePackage={handleUpdate}
                            action={actionPackageModal}
                            packageData={selectedPackage}
                        />
                    </div>
                </div>
                <div className='flex-1 my-4'>
                    <PackageTable
                        currentLimit={currentLimit}
                        currentPage={currentPage}
                        tableHeads={TABLE_HEADS}
                        tableRows={listPackageSearch}
                        onDeletePackage={handleDelete}
                        onSelectPackage={handleSelectPackage} />
                </div>
                {totalPages > 0 &&
                    <Pagination className='absolute bottom-10 left-1/2 transform -translate-x-1/2 ' count={+totalPages} page={+currentPage} onChange={handleChange} color="primary" variant="outlined" size="large" />
                }
            </div>
        </>
    );
}

export default Package;