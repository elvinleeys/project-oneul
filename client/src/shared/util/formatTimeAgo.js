export const formatTimeAgo = (createdAt) => {
    const timeElapsed = Math.floor((new Date() - new Date(createdAt)) / 1000);

    if (timeElapsed < 60) {
        return "방금 전";
    }

    if (timeElapsed < 60 * 60) {
        return `${Math.floor(timeElapsed / 60)}분 전`;
    }

    if (timeElapsed < 60 * 60 * 24) {
        return `${Math.floor(timeElapsed / (60 * 60))}시간 전`;
    }

    if (timeElapsed < 60 * 60 * 24 * 7) {
        return `${Math.floor(timeElapsed / (60 * 60 * 24))}일 전`;
    }

    return new Date(createdAt).toISOString().slice(0, 10);
};
