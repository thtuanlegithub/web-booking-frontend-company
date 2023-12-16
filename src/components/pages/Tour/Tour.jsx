import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Tour(props) {
    return (
        <div>
            <Link to='/create-tour' className='primary-button p-2 rounded-lg text-md font-medium px-6'>
                Create Tour
            </Link>
        </div>
    );
}

export default Tour;
