import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Button,
    Image,
    TouchableOpacity,
} from "react-native";
import { uniqBy } from "lodash";
import { fetchObj } from "./apis";
import Constants from "expo-constants";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { addFavorites, removeFavorites, favoriteIsPresent } from './localStorage'

const PRIMARY_COLOR = "#e74c3c";
const PAGE_SIZE = 20

export const RepositoryScreen = ({ navigation, route }) => {
    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([]);
    const [contributors, setContributors] = useState([]);
    const [selected, setSelected] = useState('Issues');
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [present, setPresent] = useState(false)

    async function fetchData() {
        const res = await fetchObj(`${route.params.repositoryInfo.url}/issues?page=${page}&per_page=${PAGE_SIZE}`)
        const a = await fetchObj(route.params.repositoryInfo.contributors_url)

        setIssues(res)
        setContributors(a)
        setLoading(false)
    };

    useEffect(() => {
        async function getFav() {
            const isPresent = await favoriteIsPresent(route.params.repositoryInfo)
            setPresent(isPresent)
        }
        getFav()
        setRepository(route.params.repositoryInfo);
        fetchData()
    }, [route.params.repositoryInfo])

    async function fetchMoreIssues() {
        const newIssues = await fetchObj(`${route.params.repositoryInfo.url}/issues?page=${page}&per_page=${PAGE_SIZE}`)

        setIssues((issues) => {
            const allIssues = issues.concat(
                newIssues.filter((issue) => issue.number)
            )
            return uniqBy(allIssues, "number");
        })

    }

    useEffect(() => {
        fetchMoreIssues()
    }, [page])

    const openIssueView = (item) => {
        navigation.push('Issue', { issueInfo: item })
    }

    const openUserView = (item) => {
        navigation.push('User', { userInfo: item })
    }

    function manageFav() {
        if (present) {
            removeFavorites(repository)
        } else {
            addFavorites(repository)
        }
        setPresent(!present)

    }

    function renderContributors({ item }) {
        return (
            <TouchableOpacity onPress={() => openUserView(item)} style={{ margin: 10 }}>
                <View style={styles.repository}>
                    <Image source={{ uri: item.avatar_url }} style={styles.repositoryImage} />

                    <Text style={styles.repositoryTitle}>
                        {item.login}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    function renderIssues({ item }) {
        return (
            <TouchableOpacity onPress={() => openIssueView(item)} style={{ marginHorizontal: 10, marginVertical: 5 }}>
                <View style={styles.issueContainer}>
                    <Text style={{ flex: 1 / 7, textAlign: "center" }}>
                        {item.number}
                    </Text>
                    <Text style={{ flex: 5 / 7 }} numberOfLines={1}>
                        {item.title}
                    </Text>
                    <Text style={{ flex: 1 / 7, textAlign: "center" }}>
                        <AntDesign name="exclamationcircle" size={24} color={item.state === "open" ? "green" : "red"} />
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    const keyExtractor = (item) => item.id;
    const renderDivider = () => <View style={styles.repositorySeparator}></View>;
    const renderFooter = () => (
        <View style={styles.center}>
            {contributors.length === 0 && <ActivityIndicator color={PRIMARY_COLOR} />}
        </View>
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={{
                    margin: 16
                }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={styles.repositoryTitle} numberOfLines={1}>
                                {repository.full_name}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => manageFav()}>
                                <AntDesign name="star" size={32} color={present ? "orange" : "grey"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.repositoryTitle} numberOfLines={3}>
                        {repository.description}
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.repositoryPublishedAt}>
                            Open issues : {repository.open_issues_count}
                        </Text>
                        <Text style={styles.repositoryPublishedAt}>
                            Forks : {repository.forks_count}
                        </Text>
                        <Text style={styles.repositoryPublishedAt}>
                            Watchers : {repository.watchers_count}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.repositoryPublishedAt}>
                            Size : {repository.size}
                        </Text>
                        <Text style={styles.repositoryPublishedAt}>
                            Default branch : {repository.default_branch}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        {
                            repository.fork && (
                                <AntDesign name="fork" size={24} color="red" />
                            )
                        }
                        {
                            repository.private && (
                                <FontAwesome name="user-secret" size={24} color="black" />
                            )
                        }
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                    {
                        ["Issues", "Contributors"].map((key) => {
                            return (
                                <Button
                                    key={key}
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
                        selected === "Issues" ? (
                            issues.length > 0 ? (
                                <FlatList
                                    data={issues}
                                    renderItem={renderIssues}
                                    keyExtractor={keyExtractor}
                                    ItemSeparatorComponent={renderDivider}
                                    ListFooterComponent={renderFooter}
                                    initialNumToRender={PAGE_SIZE * page}
                                    onEndReached={() => {
                                        setPage((page) => page + 1);
                                    }
                                    }
                                    onEndReachedThreshold={1}
                                />
                            ) : (
                                <Text style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                    fontSize: 22,
                                    margin: 20
                                }}>
                                    No public issues founded
                                </Text>
                            )
                        ) : (
                            contributors.length > 0 ? (
                                <FlatList
                                    data={contributors}
                                    renderItem={renderContributors}
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
                                    No contributors founded
                                </Text>
                            )
                        )
                    )
                }

            </View>
        </SafeAreaView >
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
    issueContainer: {
        paddingVertical: 7,
        marginBottom: 5,
        backgroundColor: "#d6d6d6",
        flexDirection: "row",
        fontSize: 18,
        fontWeight: "bold",

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

    repository: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#d6d6d6"
    },
    repositoryImage: {
        margin: 20,
        width: 50,
        height: 50,
        resizeMode: "contain",
        borderRadius: 100
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
