export default function removeCommas(inputString) {
    // Sử dụng biểu thức chính quy để thay thế tất cả dấu phẩy bằng chuỗi rỗng
    return inputString.replace(/,/g, '');
}
