const MAX_IMAGE_SIZE_MB = 2; // Kích thước tối đa của file ảnh (đơn vị: MB)

const isImageFile = (file) => {
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif']; // Các định dạng hỗ trợ

    return file && imageTypes.includes(file.type);
};

const isFileSizeValid = (file) => {
    return file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024; // Chuyển đổi kích thước từ MB sang byte
};
export { MAX_IMAGE_SIZE_MB, isImageFile, isFileSizeValid }