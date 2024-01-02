import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookingById } from '../../services/bookingServices';
import formatCurrency from '../utils/formatCurrency';
function Invoice(props) {
    const { bookingId } = useParams();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const fetchSelectedBooking = async () => {
        let res = await fetchBookingById(bookingId);

        if (res && res.data && res.data.EC === '0') {
            console.log(res.data.DT);
            setSelectedBooking(res.data.DT);
        }
    }
    useEffect(() => { fetchSelectedBooking() }, []);

    return (<>
        {
            selectedBooking &&
            <div className='flex justify-center'>
                <div style={{
                    width: '600px'
                }} className='border px-8 py-4 mx-auto border-black mx-20 my-20'>
                    <div className='text-center font-bold text-2xl'>
                        HÓA ĐƠN
                    </div>
                    <div className='font-bold text-lg'>Thông tin khách hàng</div>
                    <div className='ml-4'>
                        <div className='inline font-bold'>Họ tên: </div>
                        <div className='inline'>{selectedBooking.Customer.customerName}</div>
                    </div>
                    <div className='ml-4'>
                        <div className='inline font-bold'>Số điện thoại: </div>
                        <div className='inline'>{selectedBooking.Customer.customerPhone}</div>
                    </div>
                    <div className='ml-4'>
                        <div className='inline font-bold'>Gmail: </div>
                        <div className='inline'>{selectedBooking.Customer.customerGmail}</div>
                    </div>
                    <div className='font-bold text-lg mt-4'>Thông tin dịch vụ</div>
                    <div className='ml-4'>
                        <div className='inline font-bold'>Mã Travel: </div>
                        <div className='inline'>{selectedBooking.Travel.id}</div>
                    </div>
                    <div className='ml-4'>
                        <div className='inline font-bold'>Tên Tour: </div>
                        <div className='inline'>{selectedBooking.Travel.Tour.tourName}</div>
                    </div>
                    <div className='ml-4'>
                        <div className='inline font-bold'>Đơn giá: </div>
                        <div className='inline'>{formatCurrency(selectedBooking.Travel.travelPrice)} VNĐ</div>
                    </div>
                    <div className='ml-4'>
                        <div className='inline font-bold'>Số lượng khách: </div>
                        <div className='inline'>{formatCurrency(selectedBooking.Tourists.length)}</div>
                    </div>
                    <div>
                        <div className='flex float-right'>
                            <div className='inline text-lg'>Tổng tiền:</div>
                            <div className='inline text-xl ml-2 font-bold'>{formatCurrency(selectedBooking.bookingPrice)}</div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
    );
}

export default Invoice;