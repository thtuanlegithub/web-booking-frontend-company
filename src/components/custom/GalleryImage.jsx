// GalleryImage.jsx
import React from 'react';

const GalleryImage = ({ dataUrl, onRemove, onChange }) => (
    <div className="relative">
        <img
            className='rounded-md'
            src={dataUrl}
            alt={`Gallery Image`}
            style={{ display: 'inline', width: '120px', height: '100px', marginTop: '5px', cursor: 'pointer', objectFit: 'cover' }}
            onClick={onChange}
        />
        <img
            src='./close_logo.svg'
            className="absolute -right-4 -top-2 cursor-pointer"
            onClick={onRemove}
        />
    </div>
);

export default GalleryImage;
