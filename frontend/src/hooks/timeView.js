
function timeView(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
        return '방금 전';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}분 전`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}시간 전`;
    } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}일 전`;
    }
}

export default timeView;

// function timeAgo(dateString) {
//     const now = new Date();
//     const past = new Date(dateString);
//     const diffInSeconds = Math.floor((now - past) / 1000);
//
//     if (diffInSeconds < 60) {
//         return '방금 전';
//     } else if (diffInSeconds < 3600) {
//         const minutes = Math.floor(diffInSeconds / 60);
//         return `${minutes}분 전`;
//     } else if (diffInSeconds < 86400) {
//         const hours = Math.floor(diffInSeconds / 3600);
//         return `${hours}시간 전`;
//     } else {
//         const days = Math.floor(diffInSeconds / 86400);
//         return `${days}일 전`;
//     }
// }