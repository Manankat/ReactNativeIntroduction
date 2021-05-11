import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";

export function User({ item, navigation }) {
    console.log(item)

    function openUserView() {
        navigation.push('User', { userInfo: item })
    }

    return (
        <TouchableOpacity onPress={() => openUserView()}>
            <View style={styles.user}>
                <Image source={{ uri: item.avatar_url }} style={styles.userImage} />

                <View style={{ flex: 1 }}>
                    <Text style={styles.userTitle} numberOfLines={3}>
                        {item.login}
                    </Text>

                    <Text style={styles.userPublishedAt}>
                        Type : {item.type}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    user: {
        flexDirection: "row",
        paddingVertical: 15,
    },
    userImage: {
        width: 150,
        height: 85,
        resizeMode: "contain",
        marginRight: 15,
    },
    userTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    userDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    userPublishedAt: {
        fontSize: 14,
    },
});
