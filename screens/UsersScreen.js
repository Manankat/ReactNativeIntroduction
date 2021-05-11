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
import { MainHeader, User } from "../components";
import { BackgroundColor } from "../constants";

const PAGE_SIZE = 10;
const PRIMARY_COLOR = "#e74c3c";

export function UsersScreen({ navigation }) {
    const [query, setQuery] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const hasMoreData = useRef(true);

    function userSubmit() {
        setUsers([]);
        setPage(1)
        fetchData()
    }

    async function fetchData() {
        if (hasMoreData.current && users.length > 0) return;

        const newUsers = await searchGithub('users', query, page, PAGE_SIZE);
        if (newUsers.length < PAGE_SIZE) {
            hasMoreData.current = false;
        }

        setUsers((users) => {
            const allUsers = users.concat(
                newUsers.filter((user) => user.avatar_url)
            );

            return uniqBy(allUsers, "url");
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
        setUsers([]);
        hasMoreData.current = true;
    };

    const renderUser = ({ item }) => <User item={item} navigation={navigation} />;
    const renderDivider = () => <View style={styles.userSeparator}></View>;
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
                    title="Users"
                    isMain={true}
                    navigation={navigation}
                />
                <View style={{ margin: 10 }}>
                    <View>
                        <TextInput style={styles.textInput} onChangeText={search => setQuery(search)} placeholder="Type Here..." />
                    </View>
                    <View style={{ marginHorizontal: 100 }}>
                        <Button style={styles.button} title="Search" color={BackgroundColor} onPress={userSubmit} />
                    </View>
                </View>
                {isLoading ? (
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                    </View>
                ) : (
                    <FlatList
                        data={users}
                        renderItem={renderUser}
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
    userSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: "#ed7669",
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
