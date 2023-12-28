import '../../styles/Table.css';
import React from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchTourById } from '../../../services/tourServices';
import { Link } from 'react-router-dom';
function TourTable(props) {
    const currentPage = props.currentPage;
    const currentLimit = props.currentLimit;
    const TABLE_HEADS = props.tableHeads;
    const TABLE_ROWS = props.tableRows;
    const handleSelectTour = async (id) => {
        let response = await fetchTourById(id);
        if (response && response.data && response.data.EC === '0') {
            // console.log(response.data.DT);
        }
    }
    const validateDelete = (tourId) => {
        return true;
    }
    const handleDeleteTour = (tourData) => {
        if (validateDelete(tourData.id) === true) {
            // console.log(">>> package data delete req", packageData);
            // let res = await deletePackage(packageData);
            props.onDeleteTour(tourData); // Invoke the callback
        }
    }
    return (
        <table className="tour-table mt-4 w-full min-w-max table-auto text-left">
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
                    (tourData, index) => {
                        return (
                            <tr key={tourData.id}>
                                <td className="py-3 font-normal text-md pl-4 w-24!">
                                    {index + 1 + (currentPage - 1) * currentLimit}
                                </td>
                                <td className="font-normal text-md pl-4 w-64! truncate overflow-hidden">
                                    {tourData.id}
                                </td>
                                <td className="font-normal text-md pl-4 w-64! truncate overflow-hidden">
                                    {tourData.tourName}
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4 w-48!">
                                        {tourData.totalDay}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4 w-48!">
                                        {tourData.totalNight}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4 w-48!">
                                        {tourData.tourPrice}
                                    </div>
                                </td>
                                <td>
                                    {tourData.tourStatus === 'Completed' &&
                                        <div className="font-normal text-md inline !font-medium bg-green-100 rounded-lg py-2 px-4 mx-1">
                                            {tourData.tourStatus}
                                        </div>
                                        ||
                                        <div className="font-normal text-md inline !font-medium bg-red-100 rounded-lg py-2 px-4 mx-1">
                                            {tourData.tourStatus}
                                        </div>
                                    }
                                </td>
                                <td>
                                    <div className="font-medium text-md pl-4 cursor-pointer hover:underline w-24!">
                                        <Link to={`/update-tour/${tourData.id}`}>
                                            <IconButton aria-label="edit" size="medium" color="primary" onClick={() => handleSelectTour(tourData.id)}>
                                                <EditIcon fontSize="inherit" />
                                            </IconButton>
                                        </Link>
                                        <IconButton aria-label="delete" size="medium" color="error" onClick={() => handleDeleteTour(tourData)}>
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

export default TourTable;