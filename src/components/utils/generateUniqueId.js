export const generateUniqueId = () => {
    const randomArray = new Uint32Array(2);
    crypto.getRandomValues(randomArray);

    const uniqueId = randomArray[0].toString(16) + randomArray[1].toString(16);
    return uniqueId;
}
