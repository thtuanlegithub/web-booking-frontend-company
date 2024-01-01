import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { generateUniqueId } from '../utils/generateUniqueId';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../config/firebase';

const UpdateImageUploader = forwardRef((props, ref) => {
    const [mainImage, setMainImage] = useState(null);

    const handleMainImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setMainImage({ dataUrl: reader.result, file });
            };

            reader.readAsDataURL(file);
            // setGallery([]); // Reset gallery when changing the main image
        }
    };

    const handleRemoveMainImage = () => {
        setMainImage(null);
        // Clear the value of the file input
        const mainImageInput = document.getElementById('mainImageInput');
        if (mainImageInput) {
            mainImageInput.value = '';  // This clears the selected file
        }
    };


    const handleUploadImages = async () => {
        console.log(">>> handleUploadImages called");
        const storage = getStorage(app);
        const storageFolderRef = storageRef(storage, 'images');

        // Upload main image
        if (mainImage) {
            const mainImageRef = storageRef(storageFolderRef, generateUniqueId());
            if (mainImage && mainImage.file != '') {
                await uploadBytes(mainImageRef, mainImage.file);
                const mainImageId = await getDownloadURL(mainImageRef);
                console.log("main image changed!", mainImage);
                await props.onMainImageUpload(mainImageId);
            }
            else {
                console.log(">>> main image not change, main image: ", mainImage);
                await props.onMainImageUpload(props.fetchMainImageUrl);
            }
        }
        else {
            console.log(">>> main image is removed");
            await props.onMainImageUpload('/');
        }
        const paymentImageChangeCall = [];
        paymentImageChangeCall.push('/');
        await props.onMainImageChangeCall(paymentImageChangeCall);
    };

    useImperativeHandle(ref, () => ({
        handleUploadImages: handleUploadImages,
    }));

    useEffect(() => {
        console.log('main img url', props.fetchMainImageUrl);
        if (props.fetchMainImageUrl === '/') {
            setMainImage(null);
        }
        else {
            setMainImage({
                dataUrl: props.fetchMainImageUrl,
                file: ''
            });
        }
    }, [props.fetchMainImageUrl])

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
                        cursor: 'pointer',
                        height: '250px',
                        width: 'auto',
                    }}
                    onClick={() => document.getElementById('mainImageInput').click()}
                >
                </div>
                {mainImage && (
                    <img
                        src='../close_logo.svg'
                        className="cursor-pointer btn-remove-image absolute text-2xl -right-2 -top-2"
                        onClick={handleRemoveMainImage}
                    />
                )}
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
        </div>
    );
});

export default UpdateImageUploader;
