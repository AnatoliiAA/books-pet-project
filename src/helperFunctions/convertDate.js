export function convertDate(dateStr) {
    const date = new Date(dateStr)
    const dayNumber = date.getDate() > 9 ? date.getDate() + 1 : '0' + (date.getDate() + 1);
    const monthNumber = date.getMonth() > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const readableDate = `${dayNumber}.${monthNumber}.${date.getFullYear()}`;
    return readableDate;
}
