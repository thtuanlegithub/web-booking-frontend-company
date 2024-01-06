import '../../styles/Package.css';
import React, { useEffect, useState, useRef } from 'react';
import PackageTable from './PackageTable';
import PackageModal from './PackageModal';
import { createPackage, updatePackage, deletePackage, fetchPackagePagination } from '../../../services/packageServices';
import Pagination from '@mui/material/Pagination';
import ConfirmDialog from '../../custom/ConfirmDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
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
    const [searchCategory, setSearchCategory] = useState("Name"); // Lưu trữ loại tìm kiếm
    const [searchText, setSearchText] = useState(""); // Lưu trữ từ khóa tìm kiếm
    const handleCategoryChange = (event, value) => {
        setSearchCategory(event.target.value);
        setCurrentPage(1); // Reset trang về trang đầu tiên khi thay đổi loại tìm kiếm
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
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
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
            <div className='flex flex-col h-full mx-8 2xl:mx-20'>
                <div className='flex flex-row justify-between my-4'>
                    <div className="flex flex-1">
                        <select
                            onChange={handleCategoryChange}
                            defaultValue={"Name"}
                            id="dropdown-button"
                            className="z-10 py-2.5 px-4 py-2 text-sm font-medium text-gray-900 bg-blue-100 border border-gray-300 rounded-s-lg focus:ring-2 focus:outline-none focus:ring-2"
                            type="button">
                            <option value="" disabled>Select Categories</option>
                            <option value="Name">Package Name</option>
                            <option value="Id">Package Id</option>
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