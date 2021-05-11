import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";

export function Repository({ item, navigation }) {
    function openRepositoryView() {
        navigation.push('Repository', { repositoryInfo: item })
    }

    return (
        <TouchableOpacity onPress={() => openRepositoryView()}>
            <View style={styles.repository}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.repositoryTitle} numberOfLines={1}>
                        {item.full_name}
                    </Text>
                    <Text style={styles.repositoryTitle} numberOfLines={3}>
                        {item.description}
                    </Text>


                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.repositoryPublishedAt}>
                            Open issues : {item.open_issues_count}
                        </Text>
                        <Text style={styles.repositoryPublishedAt}>
                            Forks : {item.forks_count}
                        </Text>
                        <Text style={styles.repositoryPublishedAt}>
                            Watchers : {item.watchers_count}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    repository: {
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    repositoryImage: {
        width: 150,
        height: 85,
        resizeMode: "contain",
        marginRight: 15,
    },
    repositoryTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    repositoryDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    repositoryPublishedAt: {
        fontSize: 14,
    },
});
