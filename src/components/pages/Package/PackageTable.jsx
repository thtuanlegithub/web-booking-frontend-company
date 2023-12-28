import '../../styles/Table.css';
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDialog from '../../custom/ConfirmDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { fetchTourPackageList } from '../../../services/tourpackageServices';
function PackageTable(props) {
    const currentPage = props.currentPage;
    const currentLimit = props.currentLimit;
    const TABLE_HEADS = props.tableHeads;
    const TABLE_ROWS = props.tableRows;
    const [selectedPackage, setSelectedPackage] = useState();
    const handleSelectPackage = (packageData) => {
        props.onSelectPackage(packageData);
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
    const [listPackageInTourId, setListPackageInTourId] = useState([]);
    useEffect(() => {
        fetchTourPackage();
    }, [])
    const fetchTourPackage = async () => {
        let res = await fetchTourPackageList();
        if (res && res.data && res.data.EC === '0') {
            const listTourPackage = res.data.DT;
            const listTourPackageId = listTourPackage.map((item) => (item.packageId));
            setListPackageInTourId(listTourPackageId);
        }
    }
    const validateDelete = (id) => {
        // Check exists in Tour
        if (listPackageInTourId.includes(id)) {
            return false;
        }
        else {
            return true;
        }

    }
    const handleConfirmDelete = () => {
        props.onDeletePackage(selectedPackage); // Invoke the callback
        setConfirmDialogOpen(false);
        alert("Delete Package successfully!");
    };

    const handleCancelDelete = () => {
        // Đóng Confirm Dialog khi người dùng hủy bỏ
        setConfirmDialogOpen(false);
    };
    const handleDeletePackage = (packageData) => {
        console.log('validate delete package', validateDelete(packageData.id));
        if (validateDelete(packageData.id)) {
            setSelectedPackage(packageData);
            setConfirmDialogOpen(true);
        }
        else {
            setSnackbarMessage('Can not delete Package existing in Tour');
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
                content={`Do you want to delete this package?`}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
            <table className="package-table mt-4 w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEADS.map((head, index) => (
                            <th
                                key={head}
                                className="font-semibold border-y border-blue-gray-100 p-4 transition-colors hover:bg-blue-50"
                            >{head}
                            </th>
                        ))}
                        <th
                            className="font-semibold border-y border-blue-gray-100  p-4 transition-colors hover:bg-blue-50"
                        >
                            Operations
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map(
                        (packageData, index) => {
                            return (
                                <tr key={packageData.id}>
                                    <td className="py-3 font-normal text-md pl-4 w-24!">
                                        {index + 1 + (currentPage - 1) * currentLimit}
                                    </td>
                                    <td className="py-3 font-normal text-md pl-4 w-24!">
                                        {packageData.id}
                                    </td>
                                    <td className="font-normal text-md pl-4 w-64! truncate overflow-hidden">
                                        {packageData.packageName}
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {packageData.packageType}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-normal text-md pl-4 w-48!">
                                            {packageData.packageAddress}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-medium text-md pl-4 cursor-pointer hover:underline w-24!">
                                            <IconButton aria-label="edit" size="medium" color="primary" onClick={() => handleSelectPackage(packageData)}>
                                                <EditIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="medium" color="error" onClick={() => handleDeletePackage(packageData)}>
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

export default PackageTable;