import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { generateUniqueId } from '../utils/generateUniqueId';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../config/firebase';

const UpdateImageUploader = forwardRef((props, ref) => {
    const [mainImage, setMainImage] = useState(null);
    const [gallery, setGallery] = useState([]);
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

    const handleGalleryImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (gallery.length < 6) {
                const reader = new FileReader();

                reader.onload = () => {
                    setGallery((prevGallery) => [...prevGallery, { dataUrl: reader.result, file }]);
                };

                reader.readAsDataURL(file);
            } else {
                alert('You can upload up to 6 images.');
            }
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

    const handleRemoveImage = (index) => {
        setGallery((prevGallery) => prevGallery.filter((_, i) => i !== index));

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
                console.log("main image not change");
                await props.onMainImageUpload(mainImage.dataUrl);
            }
        }
        else {
            console.log(">>> main image is removed");
            await props.onMainImageUpload('/');
        }
        // Upload additional images
        const additionalImageIds = [];
        for (const galleryImage of gallery) {
            const galleryImageRef = storageRef(storageFolderRef, generateUniqueId());
            if (galleryImage && galleryImage.file != '') {
                await uploadBytes(galleryImageRef, galleryImage.file);
                const galleryImageId = await getDownloadURL(galleryImageRef);
                additionalImageIds.push(galleryImageId);
                console.log("an additional image changes");
            }
            else {
                console.log(">>> additionals image not change/ exists, additional image: ", galleryImage);
                additionalImageIds.push(galleryImage.dataUrl);
            }
        }
        // Gọi callback và truyền additionalImageIds lên cha
        if (additionalImageIds.length > 0) {
            await props.onAdditionalImagesUpload(additionalImageIds);
        }
        else {
            await props.onAdditionalImagesUpload(['/']);
        }

    };

    useImperativeHandle(ref, () => ({
        handleUploadImages: handleUploadImages,
    }));

    useEffect(() => {
        console.log('main img url', props.fetchMainImageUrl);
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
        else if (props.fetchAdditionalImageUrls.length > 0 && props.fetchAdditionalImageUrls[0] != '/') {
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
            <div className='flex flex-wrap flex-row justify-start gap-4 mt-4'>
                {gallery.map((image, index) => (
                    <div key={index} className="relative">
                        <img
                            className='rounded-md'
                            src={image.dataUrl}
                            alt={`Image ${index + 1}`}
                            style={{ display: 'inline', width: '120px', height: '100px', marginTop: '5px', cursor: 'pointer', objectFit: 'cover' }}
                            onClick={() => document.getElementById('galleryImageInput').click()}
                        />
                        <img
                            src='../close_logo.svg'
                            className="absolute -right-4 -top-2 cursor-pointer"
                            onClick={() => handleRemoveImage(index)}
                        />
                    </div>
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
                src="../miniImgPlaceholder.svg"
                alt="Additional Image"
                style={{ objectFit: 'cover', width: '50px', height: '50px', margin: '5px', cursor: 'pointer' }}
                onClick={() => document.getElementById('galleryImageInput').click()}
            />
        </div>
    );
});

export default UpdateImageUploader;
