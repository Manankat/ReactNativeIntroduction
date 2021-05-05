import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Button,
    TextInput,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    Alert,
    SafeAreaView
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import MainHeader from "../components/MainHeader";
import { BackgroundColor } from "../constants";
import { uniqBy } from "lodash";


function User({ item, index }) {
    return (
        <View style={userStyles.article}>
            <Image
                style={userStyles.articleImage}
                source={{ uri: item.avatar_url }}
            />

            <View style={{ flex: 1 }}>
                <TouchableHighlight style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: "#d6d6d6",
                    borderBottomColor: '#f2f2f2',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }} key={index} onPress={() => openUserView(index)}>
                    <Text>
                        {item.login}
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

/*

            <Text>
                {item.score}
            </Text>

            */
const userStyles = StyleSheet.create({
    article: {
        flexDirection: "row",
        paddingVertical: 15,
    },
    articleImage: {
        width: 150,
        height: 85,
        resizeMode: "contain",
        marginRight: 15,
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    articleDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    articlePublishedAt: {
        fontSize: 14,
    },
});


export const UsersScreen = ({ navigation, route }) => {
    const [searchResults, setResults] = useState([]);
    const [search, setText] = useState('a');
    const [isLoading, setLoading] = useState(true);
    const hasMoreData = useState(false)
    const [page, setPage] = useState(1);



    const openUserView = (index) => {
        navigation.navigate('User', { userInfo: searchResults[index] })
    }

    useEffect(() => {
        userSubmit()
    }, [])

    async function userSubmit() {
        if (!hasMoreData) return;
        var A = search.toLowerCase().trim();

        try {
            const response = await fetch(`https://api.github.com/search/users?q=${A}`);
            const newResults = await response.json();

            setResults((searchResults) => {
                // Combine and filter article has no image
                const allResults = searchResults.concat(
                    newResults.items.filter((result) => result.avatar_url)
                );

                // Remove duplicate articles
                // https://lodash.com/docs/4.17.15#uniqBy
                return uniqBy(allResults, "url");
            });

            setPage(page + 1)
            setLoading(false);
        } catch (error) {
            Alert.alert("Cannot connect to Server!");
        }
    }

    function renderItem({ item, index }) {
        return (
            <User item={item} index={index} />
        );
    };

    const renderDivider = () => <View style={{
        borderBottomWidth: 1,
        borderBottomColor: "#ed7669",
    }}></View>;
    const renderFooter = () => (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            {hasMoreData && <ActivityIndicator color="blue" />}
        </View>
    );
    const keyExtractor = (item) => item.avatar_url;


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.headlines}>Worldwide News</Text>
                {
                    /*
                    <MainHeader
                        title="Users"
                        isMain={true}
                        navigation={navigation}
                    />
                <View style={{ margin: 10 }}>
                    <View>
                        <TextInput style={oldStyles.textInput} onChangeText={search => setText(search)} placeholder="Type Here..." />
                    </View>
                    <View style={{ marginHorizontal: 100 }}>
                        <Button style={oldStyles.button} title="Search" color={BackgroundColor} onPress={userSubmit} />
                    </View>
                </View>
                        */
                }

                {!isLoading ? (
                    <FlatList
                        data={searchResults}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        initialNumToRender={30}
                        onEndReached={console.log(page)}
                        ItemSeparatorComponent={renderDivider}
                        ListFooterComponent={renderFooter}
                        onEndReachedThreshold={0.5}
                        showsVerticalScrollIndicator={false}
                        onRefresh={console.log("refresh")}
                    />
                ) : (
                    <ActivityIndicator animating size="large" style={{ marginTop: 20 }} />
                )}
            </View>
        </SafeAreaView>
    );
};


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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    content: {
        flex: 1,
        padding: 15,
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
        color: "red",
    },
    articleSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: "#ed7669",
    },
});
