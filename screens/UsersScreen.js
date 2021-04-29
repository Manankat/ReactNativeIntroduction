import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Button, TextInput, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const PER_PAGE = 50

export const UsersScreen = ({ navigation, route }) => {
    const [query, setQuery] = useState('');
    const [searchResults, setResults] = useState([])
    const [page, setPage] = useState(1)
    const [onceFetched, setOnceFetched] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [page])

    function openUserView(index) {
        navigation.navigate('User', { userInfo: searchResults[index] })
    }

    function fetchUsers() {
        if (!(onceFetched && searchResults.length === 0) || (onceFetched && searchResults.length % PER_PAGE === 0)) {

            const processedQuery = query.toLowerCase().trim()
            if (processedQuery.length > 0) {
                setOnceFetched(true)
                fetch(`https://api.github.com/search/users?q=${processedQuery}&page=${page}&per_page=${PER_PAGE}`)
                    .then(res => {
                        res.json().then((data) => {
                            if (res.status === 200) {
                                setResults(searchResults.concat(data.items))
                            } else {
                                setError(res.data.message)
                            }
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
            }
        } else {

        }
    }

    return (
        <View style={{
            flex: 1
        }}>
            <View style={styles.header} style={{ margin: "5px" }}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setQuery}
                    value={query}
                    placeholder="Type Here..."
                />
            </View>
            <View style={{
                flex: 1,
                margin: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'stretch',
            }}>
                <TouchableOpacity
                    style={styles.button}
                    title="" onPress={() => {
                        setOnceFetched(false)
                        setPage(1)
                        setResults([])
                        fetchUsers()
                    }
                    }
                >
                    <Text style={styles.buttonLabel}>
                        Search
                    </Text>
                </TouchableOpacity>
            </View>
            {
                searchResults.length > 0 && (
                    <FlatList
                        onEndReached={console.log("go")}
                        //                            onEndReached={setPage(page + 1)}
                        data={searchResults}
                        extraData={onceFetched}
                        onEndReachedThreshold={0.8}
                        keyExtractor={(index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableHighlight style={styles.item} key={index} onPress={() => openUserView(index)}>
                                <View style={styles.itemView}>
                                    <Image
                                        style={styles.avatar}
                                        source={item.avatar_url}
                                    />
                                    <Text style={styles.name}>{item.login}</Text>
                                </View>
                            </TouchableHighlight>

                        )}
                    />
                )
            }
        </View>
    );
};


const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#ecf0f1',
        position: "sticky",
        width: "100%",
        top: 0,
        zIndex: 10,
        textAlign: "center",
        alignItems: "center",
    },
    textInput: {
        alignItems: 'center',
        backgroundColor: '#b3b3b3',
        borderRadius: 10,
        color: 'black',
        justifyContent: "flex-start",
        fontSize: 14,
        padding: 10,
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: "oldlace",
        alignSelf: "flex-start",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
    },
    buttonLabel: {
        fontSize: 14,
        fontWeight: "700",
        color: "coral",
    },
    item: {
        width: "100%",
        margin: 5,
        backgroundColor: "#d6d6d6",
        flexDirection: "row",
        height: "50px",
    },
    itemView: {
        flexDirection: "row"
    },
    avatar: {
        width: 50,
        height: 50,
        flex: 1
    },
    name: {
        alignContent: "center",
    }
});
