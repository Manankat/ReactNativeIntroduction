import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Button,
    TextInput,
    Image,
    TouchableHighlight,
    TouchableOpacity,
} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { getRepositories, getFollowers } from "./apis";
import Constants from "expo-constants";
const PRIMARY_COLOR = "#e74c3c";

export const UserScreen = ({ navigation, route }) => {
    const [repositories, setRepositories] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [user, setUser] = useState({});
    const [selected, setSelected] = useState('Repositories');
    const [isLoading, setLoading] = useState(true);

    async function fetchData() {
        const res = await getRepositories(route.params.userInfo.repos_url)
        const a = await getFollowers(route.params.userInfo.followers_url)

        setRepositories(res)
        setFollowers(a)
        setLoading(false)
    };


    useEffect(() => {
        fetchData()
        setUser(route.params.userInfo);
    }, [route.params.userInfo])

    const openRepoView = (item) => {
        navigation.push('Repository', { repoInfo: item })
    }

    const openUserView = (item) => {
        navigation.push('User', { userInfo: item })
    }

    function renderUser({ item }) {
        return (
            <TouchableOpacity onPress={() => openUserView(item)} style={{ margin: 10 }}>
                <View style={styles.user}>
                    <Image source={{ uri: item.avatar_url }} style={styles.userImage} />

                    <Text style={styles.userTitle}>
                        {item.login}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    function renderRepository({ item }) {
        return (
            <TouchableHighlight onPress={() => openRepoView(item)} style={{ marginHorizontal: 10, marginVertical: 5 }}>
                <View style={styles.repositoyContainer}>
                    <Text style={{ flex: 4 / 7 }}>
                        {item.name}
                    </Text>
                    <Text style={{ flex: 1 / 7, textAlign: "center" }}>
                        {item.forks_count}
                    </Text>
                    <Text style={{ flex: 1 / 7, textAlign: "center" }}>
                        {item.open_issues_count}
                    </Text>
                    <Text style={{ flex: 1 / 7, textAlign: "center" }}>
                        {item.watchers_count}
                    </Text>

                </View>
            </TouchableHighlight>
        )
    }
    const keyExtractor = (item) => item.url;
    const renderDivider = () => <View style={styles.userSeparator}></View>;
    const renderFooter = () => (
        <View style={styles.center}>
            {followers.length === 0 && <ActivityIndicator color={PRIMARY_COLOR} />}
        </View>
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ScrollView>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: 16
                    }}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: user.avatar_url }}
                        />
                        <Text style={styles.name}>
                            {user.login}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                        {
                            ["Repositories", "Followers"].map((key) => {
                                return (
                                    <Button
                                        title={key}
                                        color={key === selected ? "#000EDF" : "#559EDF"}
                                        onPress={() => setSelected(key)}
                                    />
                                )
                            })
                        }
                    </View>
                    {
                        isLoading ? (
                            <ActivityIndicator color={PRIMARY_COLOR} />
                        ) : (
                            selected === "Repositories" ? (
                                repositories.length > 0 ? (
                                    <FlatList
                                        data={repositories}
                                        renderItem={renderRepository}
                                        keyExtractor={keyExtractor}
                                        ItemSeparatorComponent={renderDivider}
                                        ListFooterComponent={renderFooter}
                                    />
                                ) : (
                                    <Text style={{
                                        textAlign: "center",
                                        justifyContent: "center",
                                        fontSize: 22,
                                        margin: 20
                                    }}>
                                        No public repositories founded
                                    </Text>
                                )
                            ) : (
                                followers.length > 0 ? (
                                    <FlatList
                                        data={followers}
                                        renderItem={renderUser}
                                        keyExtractor={keyExtractor}
                                        ItemSeparatorComponent={renderDivider}
                                        ListFooterComponent={renderFooter}
                                    />
                                ) : (
                                    <Text style={{
                                        textAlign: "center",
                                        justifyContent: "center",
                                        fontSize: 22,
                                        margin: 20
                                    }}>
                                        No followers founded
                                    </Text>
                                )
                            )
                        )
                    }

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
    repositoyContainer: {
        marginBottom: 5,
        backgroundColor: "#d6d6d6",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    titleTypo: {
        marginTop: 30,
        alignContent: "center",
        fontSize: 20
    },
    avatar: {
        width: 180,
        height: 180,
        resizeMode: "contain",
        flex: 3 / 7,
        borderRadius: 100
    },
    name: {
        marginTop: 20,
        alignContent: "center",
        fontSize: 30,
        flex: 3 / 7,
        textAlign: "center"
    },
    type: {
        marginTop: 10,
        alignContent: "center",
        fontSize: 15
    },
    repoName: {
        fontSize: 15,
    },

    user: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#d6d6d6"
    },
    userImage: {
        margin: 20,
        width: 50,
        height: 50,
        resizeMode: "contain",
        borderRadius: 100
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
