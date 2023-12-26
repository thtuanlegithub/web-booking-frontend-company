import { FaWrench, FaMoneyCheckAlt, FaUserTag, FaBullhorn, FaPlaneDeparture, FaChartPie, FaShoppingCart, FaMap, FaBusinessTime } from "react-icons/fa";

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <FaChartPie />
    },
    {
        key: 'travel',
        label: 'Travel',
        path: '/travel',
        icon: <FaPlaneDeparture />
    },
    {
        key: 'tour',
        label: 'Tour',
        path: '/tour',
        icon: <FaMap />
    },
    {
        key: 'package',
        label: 'Package',
        path: '/package',
        icon: <FaBusinessTime />
    },
    {
        key: 'discount',
        label: 'Discount',
        path: '/discount',
        icon: <FaBullhorn />
    },
    {
        key: 'booking',
        label: 'Booking',
        path: '/booking',
        icon: <FaShoppingCart />
    },
    {
        key: 'customer',
        label: 'Customer',
        path: '/customer',
        icon: <FaUserTag />

    },
    // {
    //     key: 'invoice',
    //     label: 'Invoice',
    //     path: '/invoice',
    //     icon: <FaMoneyCheckAlt />
    // }
]

export const DASHBOARD_BOTTOM_LINKS = [
    {
        key: 'support',
        label: 'Support',
        path: '/support',
        icon: <FaWrench />
    }
]