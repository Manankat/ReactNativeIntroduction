import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const UserScreen = ({ navigation, route }) => {
    const [repositories, setRepositories] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchRepositories(route.params.userInfo.repos_url);
        fetchFollowers(route.params.userInfo.followers_url);
        setUser(route.params.userInfo);
    }, [])

    const fetchRepositories = (link) => {
        fetch(link)
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setError(data.message)
                } else {
                    setRepositories(data)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchFollowers = (link) => {
        fetch(link)
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setError(data.message)
                } else {
                    setFollowers(data)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const openRepoView = (index) => {
        navigation.navigate('Repository', { repoInfo: repositories[index] })
    }

    const openUserView = (index) => {
        fetchRepositories(followers[index].repos_url)
        fetchFollowers(followers[index].followers_url)
        setUser(followers[index]);
        window.scrollTo(0, 0);
    }

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.itemView}>
                        <Image
                            style={styles.avatar}
                            source={user.avatar_url}
                        />
                        <Text style={styles.name}>
                            {user.login}
                        </Text>
                        <Text style={styles.type}>
                            {user.type}
                        </Text>
                        <Text style={styles.repo}>
                            Repositories
                        </Text>
                        {
                            repositories.map((element, index) => {
                                return (
                                    <TouchableHighlight style={styles.item} key={index} onPress={() => openRepoView(index)}>
                                        <View style={styles.itemView}>
                                            <Text style={styles.repoName}>{element.name}</Text>
                                        </View>
                                    </TouchableHighlight>
                                )
                            })
                        }
                        <Text style={styles.repo}>
                            Followers
                        </Text>
                        {
                            followers.map((element, index) => {
                                return (
                                    <TouchableHighlight style={styles.item} key={index} onPress={() => openUserView(index)}>
                                        <View style={styles.itemView}>
                                            <Text style={styles.repoName}>{element.login}</Text>
                                        </View>
                                    </TouchableHighlight>)
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    item: {
        width: "100%",
        marginBottom: 5,
        backgroundColor: "#d6d6d6",
        flexDirection: "row",
        height: 50,
    },
    itemView: {
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        width: 200,
        height: 200,
        flex: 1
    },
    name: {
        marginTop: 20,
        alignContent: "center",
        fontSize: 30
    },
    type: {
        marginTop: 10,
        alignContent: "center",
        fontSize: 15
    },
    repo: {
        marginTop: 30,
        alignContent: "center",
        fontSize: 20
    },
    repoName: {
        fontSize: 15,
    }
});
