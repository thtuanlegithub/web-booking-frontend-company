import React, { useState } from 'react';

const ImageUploader = () => {
    const [mainImage, setMainImage] = useState(null);
    const [gallery, setGallery] = useState([]);

    const handleMainImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setMainImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleGalleryImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setGallery(prevGallery => [...prevGallery, reader.result]);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <div
                className='rounded-md'
                id="mainImage"
                style={{
                    objectFit: 'cover',
                    backgroundImage: `url(${mainImage || './ImgPlaceholder.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer',
                    height: '250px',
                    width: 'auto',
                    position: 'relative',
                }}
                onClick={() => document.getElementById('mainImageInput').click()}
            >
                <input
                    type="file"
                    id="mainImageInput"
                    accept="image/*"
                    style={{
                        display: 'none',
                        objectFit: 'cover',
                    }}
                    onChange={handleMainImageChange}
                />
            </div>
            <div className='flex flex-wrap flex-row justify-start gap-2 mt-2'>
                {gallery.map((image, index) => (
                    <img
                        className='rounded-md'
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        style={{ display: 'inline', width: '120px', height: '100px', marginTop: '5px', cursor: 'pointer', objectFit: 'cover' }}
                    />
                ))}
            </div>

            <input
                type="file"
                id="galleryImageInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleGalleryImageChange}
            />

            <img
                id="additionalGalleryImage"
                src="./miniImgPlaceholder.png"
                alt="Additional Image"
                style={{ objectFit: 'cover', width: '50px', height: '50px', margin: '5px', cursor: 'pointer' }}
                onClick={() => document.getElementById('galleryImageInput').click()}
            />
        </div>
    );
};

export default ImageUploader;
