import React,{useState, useEffect} from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, FlatList, TouchableHighlight} from "react-native";

export const RepositoryScreen = ({ navigation, route }) => {
    const [repositories, setRepositories] = useState('');
    const [issues, setIssues] = useState('');
    const [updated, setUpdated] = useState('');
    const [contributors, setContributors] = useState('');
    const [repository, setRepository] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!updated) {
            fetchContributors(route.params.repoInfo.contributors_url)
            setUpdated(true);
        }
    })

    const fetchIssues = (link) => {
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

    const fetchContributors = (link) => {
        fetch(link)
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setError(data.message)
                } else {
                    setContributors(data)
                }
          })
          .catch((error) => {
              console.log(error)
          })
    }

    const openUserView = (index) => {
        navigation.navigate('User', { userInfo : contributors[index] })
    }

    return (
        <>
            <View style={styles.container}>
                    <View style={styles.itemView}>
                        <Text style={styles.repo}>Repository Name</Text>
                        <Text style={styles.repo}>{route.params.repoInfo.full_name}</Text>
                        <Text style={styles.repo}>The Contributors</Text>
                        {
                            contributors.length > 0 && (
                                <FlatList
                                    data={contributors}
                                    onEndReachedThreshold={0.8}
                                    keyExtractor={(index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <TouchableHighlight style={styles.item} key={index} onPress={() => openUserView(index)}>
                                            <View key={index} style={styles.block_repo}>
                                                <View style={styles.block_content}><Text>{item.login}</Text></View>
                                            </View>
                                        </TouchableHighlight>

                                    )}
                                />
                            )
                        }
                    </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    item : {
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
        margin: 30,
        alignContent: "center",
        fontSize: 20
    },
    repoName: {
        fontSize: 15,
    }
});