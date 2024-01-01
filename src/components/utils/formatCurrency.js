export default function formatCurrency(value) {
    // Sử dụng toLocaleString để định dạng số với dấu phẩy
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}