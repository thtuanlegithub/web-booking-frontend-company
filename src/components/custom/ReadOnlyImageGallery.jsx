import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { generateUniqueId } from '../utils/generateUniqueId';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../config/firebase';

const ReadOnlyImageGallery = forwardRef((props, ref) => {
    const [mainImage, setMainImage] = useState(null);
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        console.log('fetch main img url', props.fetchMainImageUrl);
        console.log('additional image', props.fetchAdditionalImageUrls);
        if (props.fetchMainImageUrl !== '/') {
            setMainImage({
                dataUrl: props.fetchMainImageUrl,
                file: ''
            });
            if (props.fetchAdditionalImageUrls.length > 0 && props.fetchAdditionalImageUrls[0] !== '/') {
                setGallery(props.fetchAdditionalImageUrls.map((item) => ({ dataUrl: item, file: '' })));
            }
        }
        else if (props.fetchAdditionalImageUrls.length > 0 && props.fetchAdditionalImageUrls[0] !== '/') {
            setGallery(props.fetchAdditionalImageUrls.map((item) => ({ dataUrl: item, file: '' })));
            setMainImage(null);
        }
        else {
            setMainImage(null);
            setGallery([]);
        }
    }, [props.fetchMainImageUrl, props.fetchAdditionalImageUrls])

    return (
        <div>
            <div className="relative">
                <div
                    className='rounded-md position-relative'
                    id="mainImage"
                    style={{
                        objectFit: 'cover',
                        backgroundImage: `url(${mainImage ? mainImage.dataUrl : '../ImgPlaceholder.svg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '250px',
                        width: 'auto',
                    }}>
                </div>
            </div>
            <div className='flex flex-wrap flex-row justify-start gap-4 mt-4'>
                {gallery.map((image, index) => (
                    <div key={index} className="relative">
                        <img
                            className='rounded-md'
                            src={image.dataUrl}
                            alt={`Image ${index + 1}`}
                            style={{ display: 'inline', width: '120px', height: '100px', marginTop: '5px', objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>

            <input
                type="file"
                id="galleryImageInput"
                accept="image/*"
                style={{ display: 'none' }}
            />
        </div>
    );
});

export default ReadOnlyImageGallery;
