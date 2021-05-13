import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    FlatList,
    ActivityIndicator,
    Text,
} from "react-native";
import Constants from "expo-constants";
import { uniqBy } from "lodash";
import { MainHeader, Repository } from "../components";
import { getFavorites, removeFavorites } from './localStorage'
import { BackgroundColor } from "../constants";

const PRIMARY_COLOR = "#e74c3c";

export const FavoritesScreen = ({ navigation, route }) => {
    const [isLoading, setLoading] = useState(true);
    const [repositories, setRepositories] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function fetchData() {
        const newRepositories = await getFavorites()

        setRepositories(newRepositories)
        setLoading(false);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshData = () => {
        setRefreshing(true);
        setRepositories([]);
        fetchData()
    };

    const renderRepository = ({ item }) => <Repository item={item} navigation={navigation} />;
    const renderDivider = () => <View style={styles.repositorySeparator}></View>;
    const keyExtractor = (item) => item.url;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <MainHeader
                    title="Favorites"
                />
                {isLoading ? (
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                    </View>
                ) : (
                    repositories.length > 0 ? (

                        <FlatList
                            data={repositories}
                            renderItem={renderRepository}
                            keyExtractor={keyExtractor}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={renderDivider}
                            onRefresh={refreshData}
                            refreshing={refreshing}
                            />
                    ) : (
                        <Text style={{
                            textAlign: "center",
                            justifyContent: "center",
                            fontSize: 22,
                            margin: 20
                        }}>
                            No favorites yet
                        </Text>
                    )
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