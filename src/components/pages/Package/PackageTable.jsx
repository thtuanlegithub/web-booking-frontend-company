import {
    ChevronUpDownIcon
} from "@heroicons/react/24/outline";
import {
    Typography,
} from "@material-tailwind/react";
import '../../styles/Table.css';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
function PackageTable(props) {
    const currentPage = props.currentPage;
    const currentLimit = props.currentLimit;
    const TABLE_HEADS = props.tableHeads;
    const TABLE_ROWS = props.tableRows;

    const handleSelectPackage = (packageData) => {
        props.onSelectPackage(packageData);
    }

    const validateDelete = (id) => {
        // Check exists in Tour

        // Return Permission
        return true;
    }
    const handleDeletePackage = async (packageData) => {
        if (validateDelete(packageData.id) === true) {
            // console.log(">>> package data delete req", packageData);
            // let res = await deletePackage(packageData);
            props.onDeletePackage(packageData); // Invoke the callback

        }
    }
    return (
        <table className="package-table mt-4 w-full min-w-max table-auto text-left">
            <thead>
                <tr>
                    {TABLE_HEADS.map((head, index) => (
                        <th
                            key={head}
                            className="cursor-pointer border-y border-blue-gray-100 p-4 transition-colors hover:bg-blue-50"
                        >
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="text-md flex items-center justify-between gap-2 font-semibold leading-none heading-color"
                            >
                                {head}
                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                            </Typography>
                        </th>
                    ))}
                    <th
                        className="cursor-pointer border-y border-blue-gray-100  p-4 transition-colors hover:bg-blue-50"
                    >
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-md flex items-center justify-between gap-2 font-semibold leading-none heading-color"
                        >
                            Operations
                        </Typography>
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
    );
}

export default PackageTable;