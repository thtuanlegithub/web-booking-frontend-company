import React, { useEffect } from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import { FaClipboardList, FaDollarSign, FaShoppingCart, FaUserTag } from 'react-icons/fa';
import '../styles/Dashboard.css';
import { getTourPlanning } from '../../services/dashboardServices';
import { fetchCustomerPagination } from '../../services/customerServices';
import { fetchBookingPagination } from '../../services/bookingServices';
import formatCurrency from '../utils/formatCurrency';
function Dashboard(props) {
    const [overviewTourPlanning, setOverviewTourPlanning] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [bookingNeedResolving, setBookingNeedResolving] = useState(0);
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [mostBookingTourId, setMostBookingTourId] = useState(150);
    const [numberTravelOfMostBooking, setNumberTravelOfMostBooking] = useState(6);
    const [numberCancelBooking, setNumberCancelBooking] = useState(7);
    const [moneyRefund, setMoneyRefund] = useState(7400000);
    useEffect(() => {
        fetchTourPlanning();
        fetchBookingNeedResolving();
        fetchTotalRevenue();
        fetchTotalCustomer();
        fetchMostBookingTourId();
    }, [])
    const fetchTourPlanning = async () => {
        let res = await getTourPlanning();
        if (res && res.data && res.data.EC == '0') {
            console.log(res);
            setOverviewTourPlanning(res.data.DT);
        }
    }
    const fetchBookingNeedResolving = async () => {
        let res = await fetchBookingPagination(0, 0);
        if (res && res.data && res.data.EC == '0') {
            console.log(res.data.DT);
            const count = res.data.DT.filter(item => item.exportInvoice === false).length;
            setBookingNeedResolving(count);
        }
    }
    const fetchTotalRevenue = async () => {
        let res = await fetchBookingPagination(0, 0);
        if (res && res.data && res.data.EC == '0') {
            const totalBookingPrice = res.data.DT.reduce((accumulator, item) => {
                if (item.exportInvoice === true) {
                    return accumulator + +item.bookingPrice;
                } else {
                    return accumulator;
                }
            }, 0);
            setTotalRevenue(totalBookingPrice);
        }
    }
    const fetchTotalCustomer = async () => {
        let res = await fetchCustomerPagination(0, 0);
        if (res && res.data && res.data.EC === '0') {
            console.log(res.data.DT);
            setTotalCustomer(res.data.DT.length);
        }
    }
    const fetchMostBookingTourId = async () => {
        let res = await fetchBookingPagination(0, 0);
        if (res && res.data && res.data.EC == '0') {
            const bookings = res.data.DT;
            const tourIdCounts = bookings.reduce((counts, booking) => {
                const tourId = booking?.Travel?.tourId;
                if (tourId !== undefined) {
                    counts[tourId] = (counts[tourId] || 0) + 1;
                }
                return counts;
            }, {});

            // Tìm TourId có số lần xuất hiện nhiều nhất
            let mostFrequentTourId;
            let maxCount = 0;
            for (const tourId in tourIdCounts) {
                if (tourIdCounts[tourId] > maxCount) {
                    maxCount = tourIdCounts[tourId];
                    mostFrequentTourId = tourId;
                }
            }

            setMostBookingTourId(mostFrequentTourId);
        }
    }
    return (
        <div className='dashboard min-w-max max-h-full overflow-y-auto'>
            <div className='dashboard-overview-bg px-8 pt-4 pb-8 mx-4 drop-shadow-lg'>
                <div className='font-bold text-2xl heading-color'>Dashboard</div>
                <div className='heading-color text-lg font-regular'>A quick data overview of the Tour Management.</div>
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:gap-12 gap-16 mx-8 mt-4 justify-evenly'>
                    <QuickOverview title='Tour Planning' data={overviewTourPlanning} content="Tours" overviewmap='tourplan' />
                    <QuickOverview title='Total Revenue' data={formatCurrency(totalRevenue)} content="VND" overviewmap='revenue' />
                    <QuickOverview title='New Bookings' data={bookingNeedResolving} content="Need Resolving" overviewmap='booking' />
                    <QuickOverview title='Customers' data={totalCustomer} content="New Customers" overviewmap='customer' />
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 statistics'>
                <div className='col-span-1 flex flex-col mx-4 my-8 gap-8 justify-evenly'>
                    <QuickReport title="bestTour" dataLeft={mostBookingTourId} dataRight={numberTravelOfMostBooking} />
                    <QuickReport title="cancelNum" dataLeft={numberCancelBooking} dataRight={moneyRefund} />
                </div>
                <div className='col-span-2 chart-booking rounded-lg mx-4 my-8 drop-shadow-md'
                    style={{
                        objectFit: 'fit',
                        backgroundImage: `url(${'./chartplaceholder.svg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: 'auto',
                    }}>
                </div>
            </div>
        </div>
    );
}
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function QuickReport(props) {
    switch (props.title) {
        case 'bestTour':
            return (
                <div className='flex-1 flex flex-row shadow-md border border-gray rounded-2xl'>
                    <div className='left-quick-report shadow-lg h-48 flex-1 flex flex-col items-center justify-center px-2'>
                        <div className='data-left text-2xl font-bold text-center'>
                            {props.dataLeft}
                        </div>
                        <div className='content-left text-lg text-center'>
                            TourId has most bookings
                        </div>
                    </div>
                    <div className='right-quick-report h-48 flex-1 flex flex-col items-center justify-center px-2'>
                        <div className='data-right text-2xl font-bold text-center'>
                            {props.dataRight}
                        </div>
                        <div className='content-right text-lg text-center'>
                            Travels for this Tour
                        </div>
                    </div>
                </div>
            )
        case 'cancelNum':
            return (
                <div className='flex-1 flex flex-row shadow-md border border-gray rounded-2xl'>
                    <div className='left-quick-report shadow-lg h-48 flex-1 flex flex-col items-center justify-center px-2'>
                        <div className='data-left text-2xl font-bold text-center'>
                            {props.dataLeft}
                        </div>
                        <div className='content-left text-lg text-center'>
                            Booking Cancel
                        </div>
                    </div>
                    <div className='right-quick-report h-48 flex-1 flex flex-col items-center justify-center px-2'>
                        <div className='data-right text-2xl font-bold text-center'>
                            {formatNumberWithCommas(props.dataRight)}
                        </div>
                        <div className='content-right text-lg text-center'>
                            Refund Money
                        </div>
                    </div>
                </div>
            )
    }
}
function QuickOverview(props) {
    const generalOverviewClass = 'relative min-w-max quick-overview flex-1 pb-4 pt-2 h-48 rounded-3xl shadow-lg cursor-pointer hover:translate-x-1 hover:-translate-y-1';
    let colorClass = '';
    switch (props.overviewmap) {
        case 'tourplan':
            colorClass = 'tour-planning-color';
            break;
        case 'revenue':
            colorClass = 'month-revenue-color';
            break;
        case 'booking':
            colorClass = 'new-booking-color';
            break;
        case 'customer':
            colorClass = 'customer-color';
            break;
        default:
            break;
    }
    return (
        <div className={classNames(generalOverviewClass, colorClass)}>
            <div className='text-2xl font-bold text-white text-center pt-4'>{props.title}</div>
            <div className='text-3xl font-bold text-white text-center pt-2'>{props.data}</div>
            <div className='text-xl text-white text-center pt-2 pr-8'>{props.content}</div>
            <div className='white-circle absolute bottom-4 right-6 flex items-center justify-center shadow-xl'>
                <OverviewIcon iconmap={props.overviewmap} />
            </div>
        </div>
    );
}
function OverviewIcon(props) {
    switch (props.iconmap) {
        case 'tourplan':
            return <FaClipboardList size={35} color='tour-planning-color' />
        case 'revenue':
            return <FaDollarSign size={35} color='month-revenue-color' />
        case 'booking':
            return <FaShoppingCart size={35} color='new-booking-color' />
        case 'customer':
            return <FaUserTag size={35} color='customer-color' />
        default:
            return null;
    }
}
export default Dashboard;