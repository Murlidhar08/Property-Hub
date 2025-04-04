const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const getGreeting = () => {
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 12) {
        return "Good Morning";
    } else if (hours >= 12 && hours < 17) {
        return "Good Afternoon";
    } else if (hours >= 17 && hours < 21) {
        return "Good Evening";
    } else {
        return "Good Night";
    }
}

export const getDocumentPath = (path) => {
    if (!path) return '';

    // Return as-is if path is already a full URL
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    return `${baseUrl}/${path.replace(/^\/+/, '')}`;
}

export default {
    getGreeting,
    getDocumentPath
};
