// Register API Key here for more requests & APIs: https://newsapi.org
const API_KEY = "ce52845d6e754123b3ecf9f68006b846";

export async function getUsers(query, page = 1, pageSize = 10) {
    const q = query.toLowerCase().trim()
    if (q) {
        try {
            const response = await fetch(
                `https://api.github.com/search/users?q=${q}&page=${page}&per_page=${pageSize}`
            );
            const jsonData = await response.json();
            return jsonData.items || [];
        } catch (error) {
            return [];
        }
    } else {
        return [];
    }
}

export async function getRepositories(link) {
    try {
        const response = await fetch(link);
        const jsonData = await response.json();

        return jsonData || [];
    } catch (error) {
        return [];
    }
}

export async function getFollowers(link) {
    try {
        const response = await fetch(link);
        const jsonData = await response.json();
        return jsonData || [];
    } catch (error) {
        return [];
    }
}