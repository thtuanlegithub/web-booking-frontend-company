import { Autocomplete, Button, TextField, TextareaAutosize } from '@mui/material';
import React, { useState } from 'react';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { createDiscount } from '../../../services/discountServices';
const DISCOUNT_TYPE = [{ label: 'Amount', value: 'Amount' },
{ label: 'Percentage', value: 'Percentage' }]
function CreateDiscount(props) {
    const [discountName, setDiscountName] = useState('');
    const [discountType, setDiscountType] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountDescription, setDiscountDescription] = useState('');
    const handleDiscountNameChange = (event) => {
        setDiscountName(event.target.value);
    }
    const handleDiscountTypeChange = (event, newValue) => {
        setDiscountType(newValue);
        if (newValue && newValue.value == 'Percentage' && discountAmount > 50) {
            setDiscountAmount(0);
        }
    }
    const handleDiscountDescriptionChange = (event) => {
        setDiscountDescription(event.target.value);
    }
    const handleDiscountAmountChange = (event) => {
        if (discountType) {
            if (discountType.value == 'Percentage') {
                let v = event.target.value;
                if (v > 50) {
                    setDiscountAmount(50);
                }
                else {
                    setDiscountAmount(v);
                }
            }
            else {
                setDiscountAmount(event.target.value);
            }
        }
        else {
            setDiscountAmount(event.target.value);
        }
    }
    const handleCreateDiscount = async () => {

        let discountData = {
            discountName: discountName,
            discountType: discountType.value,
            discountAmount: discountAmount,
            discountDescription: discountDescription
        }

        let res = await createDiscount(discountData);
        if (res && res.data && res.data.EC === '0') {
            console.log("create discount res:", res);
        }
    }
    return (
        <div className='flex flex-col max-h-full overflow-y-auto'>
            <Link to='/discount' className='w-72 mb-4 text-md heading-color font-semibold btn-back p-2 cursor-pointer rounded-lg'>
                <FaAngleDoubleLeft className='inline mr-2' />
                <div className='inline'>Back to Discount Management</div>
            </Link>
            <div className='inline text-2xl heading-color font-bold text-center mb-4'>Create Discount</div>
            <div className='flex-1 mx-auto border border-blue-500 2xl:px-16 px-8 py-4 rounded-lg'>
                <div className='text-lg font-semibold heading-color text-center'>Discount Information</div>
                <TextField
                    value={discountName}
                    onChange={handleDiscountNameChange}
                    className='!mt-4'
                    label='Discount Name'
                    required
                    fullWidth />
                <div className='flex flex-row'>
                    <Autocomplete
                        value={discountType}
                        onChange={handleDiscountTypeChange}
                        className='!mt-4 !w-64'
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
                        type='number'
                        value={discountAmount}
                        inputProps={{
                            min: 0
                        }}
                        onChange={handleDiscountAmountChange}
                        className='!mt-4 !ml-4 !w-64'
                        label='Discount Amount'
                        required
                        fullWidth />
                </div>
                <TextField
                    value={discountDescription}
                    onChange={handleDiscountDescriptionChange}
                    className='!mt-4'
                    label='Discount Description'
                    multiline
                    fullWidth
                    rows={4}
                    maxRows={8}
                />
            </div>
            <div className='flex justify-center'>
                <Button
                    className='!bg-green-500 !normal-case w-64 !bg-green-300 !mt-8 !mb-8'
                    variant="contained"
                    onClick={handleCreateDiscount}>
                    Save
                </Button>
            </div>
        </div>
    );
}

export default CreateDiscount;