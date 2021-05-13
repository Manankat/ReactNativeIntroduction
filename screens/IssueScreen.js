import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView
} from "react-native";
import Constants from "expo-constants";
import { AntDesign } from '@expo/vector-icons';
import { User } from "../components";

export const IssueScreen = ({ navigation, route }) => {
    const {
        issueInfo
    } = route.params

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ScrollView>
                    <View style={{
                        margin: 16
                    }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flex: 6 / 7 }}>
                                <Text style={styles.issueTitle} numberOfLines={2}>
                                    {issueInfo.title}
                                </Text>
                            </View>
                            <AntDesign name="exclamationcircle" size={24} color={issueInfo.state === "open" ? "green" : "red"} />
                        </View>
                        {
                            issueInfo.labels.map((item, index) => {
                                return (
                                    <View key={index} style={{ marginVertical: 5 }} >
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <View style={{ marginRight: 5 }}>
                                                <AntDesign name="tag" size={24} color={`#${item.color}`} />
                                            </View>
                                            <Text>
                                                {item.name}
                                            </Text>
                                        </View>
                                        <Text>
                                            {item.description}
                                        </Text>
                                    </View>
                                )
                            })
                        }
                        <User item={issueInfo.user} navigation={navigation} />
                        <View>
                            <Text style={styles.issueDescription}>
                                {issueInfo.body}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    content: {
        flex: 1,
        paddingVertical: 15,
    },
    issueTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    issueDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    issuePublishedAt: {
        fontSize: 14,
    },
});
