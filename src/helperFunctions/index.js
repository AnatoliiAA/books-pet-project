export function convertDate(dateStr) {
    const date = new Date(dateStr)
    const dayNumber = date.getDate() > 9 ? date.getDate() : '0' + (date.getDate());
    const monthNumber = date.getMonth() > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const readableDate = `${dayNumber}.${monthNumber}.${date.getFullYear()}`;
    return readableDate;
}
export function getDateForInput(dateStr) {
    let date = new Date();
    if (dateStr) {
        date = new Date(dateStr);
    }
    const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const mm = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const yyyy = date.getFullYear();
    const todayDate = yyyy + '-' + mm + '-' + dd;
    return todayDate
}
// export function debounce(func, delay) {
//     let timer;
//     return (...args) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             func.apply(this, args);
//         }, delay);
//     };
// }

export default { convertDate, getDateForInput }