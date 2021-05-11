import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    FlatList,
    ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { uniqBy } from "lodash";
import { MainHeader, Repository } from "../components";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRIMARY_COLOR = "#e74c3c";

export const FavoritesScreen = ({ navigation, route }) => {
    const [query, setQuery] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [repositories, setRepositories] = useState([]);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const hasMoreData = useRef(true);


    async function getFavorites() {
        try {
            const jsonValue = await AsyncStorage.getItem('favorites')
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            // error reading value
        }
    }
    async function fetchData() {
        if (!hasMoreData.current && repositories.length > 0) return;

        const newRepositories = await getFavorites()

        setRepositories((repositories) => {
            const allRepositories = repositories.concat(
                newRepositories.filter((repository) => repository.url)
            );

            return uniqBy(allRepositories, "url");
        });
        setLoading(false);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshData = () => {
        setRefreshing(true);
        setRepositories([]);
        hasMoreData.current = true;
        fetchData()
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
                    title="Favorites"
                    isMain={true}
                    navigation={navigation}
                />
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
        borderBottomColor: "#ed7669",
    },
});

const oldStyles = StyleSheet.create({
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