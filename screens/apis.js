import { Alert } from "react-native";

function createAlert(message) {
    Alert.alert("Error", `${message}`, [{ text: "OK" }])
}

export async function searchGithub(param, query, page = 1, pageSize = 10) {
    const q = query.toLowerCase().trim()
    if (q) {
        try {
            const response = await fetch(
                `https://api.github.com/search/${param}?q=${q}&page=${page}&per_page=${pageSize}`
            );
            const jsonData = await response.json();
            if (jsonData.documentation_url) {
                createAlert(jsonData.message)
            }
            return jsonData.items || [];
        } catch (error) {
            return [];
        }
    } else {
        return [];
    }
}

export async function fetchObj(link) {
    try {
        const response = await fetch(link);
        const jsonData = await response.json();

        if (jsonData.documentation_url) {
            createAlert(jsonData.message)
            return []
        } else {
            return jsonData
        }
    } catch (error) {
        return [];
    }
}
