import '../../styles/Table.css';
import React from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchTravelById } from '../../../services/travelServices';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function TravelTable(props) {
    const currentPage = props.currentPage;
    const currentLimit = props.currentLimit;
    const TABLE_HEADS = props.tableHeads;
    const TABLE_ROWS = props.tableRows;
    const handleSelectTravel = async (id) => {
        // let response = await fetchTravelById(id);
        // if (response && response.data && response.data.EC === '0') {
        //     // console.log(response.data.DT);
        // }
    }
    const validateDelete = (travelId) => {
        return true;
    }
    const handleDeleteTravel = (travelData) => {
        if (validateDelete(travelData.id) === true) {
            // console.log(">>> package data delete req", packageData);
            // let res = await deletePackage(packageData);
            props.onDeleteTravel(travelData); // Invoke the callback
        }
    }
    return (
        <table className="travel-table mt-4 w-full min-w-max table-auto text-left">
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
                    (travelData, index) => {
                        return (
                            <tr key={travelData.id}>
                                <td className="py-3 font-normal text-md pl-4 w-24!">
                                    {index + 1 + (currentPage - 1) * currentLimit}
                                </td>
                                <td className="font-normal text-md pl-4 w-64! truncate overflow-hidden">
                                    {travelData.Tour.tourName}
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4 w-48!">
                                        {dayjs(travelData.startDateTime).format("DD/MM/YYYY")}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4 w-48!">
                                        {travelData.startLocation}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4 w-48!">
                                        {travelData.travelPrice}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4 w-48!">
                                        {travelData.remainTicket + '/' + travelData.maxTicket}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-medium text-md pl-4 cursor-pointer hover:underline w-24!">
                                        <Link to={`/update-travel/${travelData.id}`}>
                                            <IconButton aria-label="edit" size="medium" color="primary" onClick={() => handleSelectTravel(travelData.id)}>
                                                <EditIcon fontSize="inherit" />
                                            </IconButton>
                                        </Link>
                                        <IconButton aria-label="delete" size="medium" color="error" onClick={() => handleDeleteTravel(travelData)}>
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

export default TravelTable;