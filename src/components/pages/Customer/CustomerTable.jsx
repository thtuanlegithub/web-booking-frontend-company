import '../../styles/Table.css';
import React from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchCustomerById } from '../../../services/customerServices';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function CustomerTable(props) {
    const currentPage = props.currentPage;
    const currentLimit = props.currentLimit;
    const TABLE_HEADS = props.tableHeads;
    const TABLE_ROWS = props.tableRows;
    const handleSelectCustomer = async (id) => {

    }
    const validateDelete = (customerId) => {
        return true;
    }
    const handleDeleteCustomer = (customerData) => {
        if (validateDelete(customerData.id) === true) {
            // console.log(">>> package data delete req", packageData);
            // let res = await deletePackage(packageData);
            props.onDeleteCustomer(customerData); // Invoke the callback
        }
    }
    return (
        <table className="customer-table mt-4 w-full min-w-max table-auto text-left">
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
                </tr>
            </thead>
            <tbody>
                {TABLE_ROWS.map(
                    (customerData, index) => {
                        return (
                            <tr key={customerData.id}>
                                <td className="py-3 font-normal text-md pl-4 w-24!">
                                    {index + 1 + (currentPage - 1) * currentLimit}
                                </td>
                                <td className="py-3 font-normal text-md pl-4 w-24!">
                                    {customerData.id}
                                </td>
                                <td className="font-normal text-md pl-4 w-64! truncate overflow-hidden">
                                    {customerData.customerName}
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4 w-48!">
                                        {customerData.customerGmail}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4 w-48!">
                                        {customerData.customerPhone}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4 w-48!">
                                        {customerData.customerAccountId}
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

export default CustomerTable;