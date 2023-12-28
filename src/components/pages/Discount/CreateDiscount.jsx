import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DISCOUNT_TYPE = [{ label: 'Amount', value: 'Amount' },
{ label: 'Percentage', value: 'Percentage' }]
function CreateDiscount(props) {
    return (
        <div className='flex flex-col max-h-full overflow-y-auto'>
            <Link to='/discount' className='w-72 mb-4 text-md heading-color font-semibold btn-back p-2 cursor-pointer rounded-lg'>
                <FaAngleDoubleLeft className='inline mr-2' />
                <div className='inline'>Back to Discount Management</div>
            </Link>
            <div className='inline text-2xl heading-color font-bold text-center mb-4'>Create Discount</div>
            <div className='flex flex-wrap xl:gap-8 gap-4'>
                <div className='flex-1 border border-blue-500 2xl:px-16 px-8 py-4 rounded-lg'>
                    <div className='text-lg font-semibold heading-color text-center'>Discount Information</div>
                    <TextField
                        className='!mt-4'
                        label='Discount Name'
                        required
                        fullWidth />
                    <div className='flex flex-row'>
                        <Autocomplete
                            className='!mt-4'
                            label='Discount Type'
                            required
                            fullWidth
                            options={DISCOUNT_TYPE}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Discount Type"
                                    required
                                />
                            )} />
                        <TextField
                            className='!mt-4 !ml-4'
                            label='Discount Amount'
                            required
                            fullWidth />
                    </div>
                    <TextareaAutosize
                        className='!mt-4'
                        label='Discount Description'
                        required
                        fullWidth />
                    <div className='w-96'></div>
                </div>
                <div className='flex-1 border border-blue-500 2xl:px-16 px-8 py-4 rounded-lg'>
                    <div className='text-lg font-semibold heading-color text-center'>List Travel Applied</div>
                    <div className='w-96'></div>
                </div>
            </div>
        </div>
    );
}

export default CreateDiscount;