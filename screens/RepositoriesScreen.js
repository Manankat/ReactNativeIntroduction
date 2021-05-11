import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    FlatList,
    ActivityIndicator,
    Button,
    TextInput,
} from "react-native";
import Constants from "expo-constants";
import { uniqBy } from "lodash";
import { searchGithub } from "./apis";
import { MainHeader, Repository } from "../components";
import { BackgroundColor } from "../constants";

const PAGE_SIZE = 10;
const PRIMARY_COLOR = "#e74c3c";

export function RepositoriesScreen({ navigation }) {
    const [query, setQuery] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [repositories, setRepositories] = useState([]);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const hasMoreData = useRef(true);

    function repositorySubmit() {
        setPage(1)
        setRepositories([])
        fetchData()
    }

    async function fetchData() {
        if (hasMoreData.current && repositories.length > 0) return;

        const newRepositories = await searchGithub('repositories', query, page, PAGE_SIZE);
        if (newRepositories.length < PAGE_SIZE) {
            hasMoreData.current = false;
        }

        setRepositories((repositories) => {
            const allRepositories = repositories.concat(
                newRepositories.filter((repository) => repository.id)
            );

            return uniqBy(allRepositories, "url");
        });
        setLoading(false);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const refreshData = () => {
        setPage(1);
        setRefreshing(true);
        setRepositories([]);
        hasMoreData.current = true;
    };

    const renderRepository = ({ item }) => <Repository item={item} navigation={navigation} />;
    const renderDivider = () => <View style={styles.repositorySeparator}></View>;
    const renderFooter = () => (
        <View style={styles.center}>
            {hasMoreData.current && <ActivityIndicator color={PRIMARY_COLOR} />}
        </View>
    );
    const keyExtractor = (item) => item.url;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <MainHeader
                    title="Repositories"
                    isMain={true}
                    navigation={navigation}
                />
                <View style={{ margin: 10 }}>
                    <View>
                        <TextInput style={styles.textInput} onChangeText={search => setQuery(search)} placeholder="Type Here..." />
                    </View>
                    <View style={{ marginHorizontal: 100 }}>
                        <Button style={styles.button} title="Search" color={BackgroundColor} onPress={repositorySubmit} />
                    </View>
                </View>
                {isLoading ? (
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                    </View>
                ) : (
                    <FlatList
                        data={repositories}
                        renderItem={renderRepository}
                        keyExtractor={keyExtractor}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={renderDivider}
                        ListFooterComponent={renderFooter}
                        initialNumToRender={6}
                        onEndReached={() => {
                            setPage((page) => page + 1);
                        }
                        }
                        onEndReachedThreshold={1}
                        onRefresh={refreshData}
                        refreshing={refreshing}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    content: {
        flex: 1,
        paddingVertical: 15,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headlines: {
        fontSize: 32,
        fontWeight: "bold",
        lineHeight: 50,
        color: PRIMARY_COLOR,
    },
    repositorySeparator: {
        borderBottomWidth: 1,
        borderBottomColor: BackgroundColor,
    },
    textInput: {
        alignItems: 'center',
        backgroundColor: '#b3b3b3',
        borderRadius: 10,
        color: 'black',
        justifyContent: "flex-start",
        fontSize: 17,
        height: 43,
        margin: 8,
        marginVertical: 10,
        paddingHorizontal: 10
    },
    button: {
        justifyContent: "flex-end",
        alignItems: 'center',
    },
});
