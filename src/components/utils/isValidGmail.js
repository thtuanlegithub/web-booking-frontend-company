export function isValidGmail(email) {
    // Biểu thức chính quy cho địa chỉ email theo cú pháp của Gmail
    const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;

    return gmailRegex.test(email);
}