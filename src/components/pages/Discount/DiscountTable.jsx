import '../../styles/Table.css';
import React from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchDiscountById } from '../../../services/discountServices';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function DiscountTable(props) {
    const currentPage = props.currentPage;
    const currentLimit = props.currentLimit;
    const TABLE_HEADS = props.tableHeads;
    const TABLE_ROWS = props.tableRows;
    const handleSelectDiscount = async (id) => {
        // let response = await fetchDiscountById(id);
        // if (response && response.data && response.data.EC === '0') {
        //     // console.log(response.data.DT);
        // }
    }
    const validateDelete = (discountId) => {
        return true;
    }
    const handleDeleteDiscount = (discountData) => {
        if (validateDelete(discountData.id) === true) {
            // console.log(">>> package data delete req", packageData);
            // let res = await deletePackage(packageData);
            props.onDeleteDiscount(discountData); // Invoke the callback
        }
    }
    return (
        <table className="discount-table mt-4 w-full min-w-max table-auto text-left text-wrap">
            <thead>
                <tr>
                    {TABLE_HEADS.map((head, index) => (
                        <th
                            key={head}
                            className="border-y border-blue-gray-100 p-4 transition-colors hover:bg-blue-50"
                        >
                            <div
                                className="text-md flex items-center justify-between gap-2 font-semibold leading-none heading-color"
                            >
                                {head}
                            </div>
                        </th>
                    ))}
                    <th
                        className="border-y border-blue-gray-100  p-4 transition-colors hover:bg-blue-50"
                    >
                        <div
                            className="text-md flex items-center justify-between gap-2 font-semibold leading-none heading-color">
                            Operations
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {TABLE_ROWS.map(
                    (discountData, index) => {
                        return (
                            <tr key={discountData.id}>
                                <td className="py-3 font-normal text-md pl-4 w-24!">
                                    {index + 1 + (currentPage - 1) * currentLimit}
                                </td>
                                <td className="font-normal text-md pl-4 w-64! truncate overflow-hidden">
                                    {discountData.Customer.customerName}
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4 w-48!">
                                        {discountData.travelId}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4 w-48!">
                                        {dayjs(discountData.createdAt).format('DD/MM/YYYY HH:mm A')}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4 w-48!">
                                        {discountData.discountPrice}
                                    </div>
                                </td>
                                <td>
                                    {
                                        discountData.exportInvoice == true &&
                                        <div className="font-medium text-md px-4 w-48! bg-green-100 py-2 rounded-lg">
                                            Completed
                                        </div> ||
                                        <div className="font-medium text-md px-4 w-48! bg-red-100 py-2 rounded-lg">
                                            Incompleted
                                        </div>
                                    }

                                </td>
                                <td>
                                    <div className="font-medium text-md pl-4 cursor-pointer hover:underline w-24!">
                                        <Link to={`/update-discount/${discountData.id}`}>
                                            <IconButton aria-label="edit" size="medium" color="primary" onClick={() => handleSelectDiscount(discountData.id)}>
                                                <EditIcon fontSize="inherit" />
                                            </IconButton>
                                        </Link>
                                        <IconButton aria-label="delete" size="medium" color="error" onClick={() => handleDeleteDiscount(discountData)}>
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

export default DiscountTable;