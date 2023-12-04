import React from 'react';
import { HiOutlineBell, HiOutlineChatAlt, HiOutlineSearch } from 'react-icons/hi';
import './Header.css'
function Header(props) {
    const getMonthName = (monthIndex) => {
        const months = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];

        if (monthIndex >= 0 && monthIndex < months.length) {
            return months[monthIndex];
        } else {
            // Trong trường hợp giá trị không hợp lệ, bạn có thể xử lý tùy thuộc vào yêu cầu cụ thể.
            return 'Invalid Month';
        }
    }
    const getDayName = (dayIndex) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        if (dayIndex >= 0 && dayIndex < days.length) {
            return days[dayIndex];
        } else {
            // Trong trường hợp giá trị không hợp lệ, bạn có thể xử lý tùy thuộc vào yêu cầu cụ thể.
            return 'Invalid Day';
        }
    }

    const date = new Date();
    let myDate = getDayName(date.getDay()) + ", " + date.getDate() + " " + getMonthName(date.getMonth()) + " " + date.getFullYear();
    return (
        <div className='bg-white px-4 flex justify-between items-center border-b border-gray-200'>
            <div>
                <div className='pt-2 text-xl font-bold heading-color'>Welcome to Tour Management, Tuan!</div>
                <div className='pb-2 font-medium heading-color'>{myDate}</div>
            </div>
            <div className='flex items-center gap-3 mr-2'>

            </div>
        </div>
    );
}

export default Header;