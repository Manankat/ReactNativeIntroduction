import React,{useState, useEffect} from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, AppRegistry, ScrollView} from "react-native";

export const RepositoryScreen = ({ navigation, route }) => {
    const [repositories, setRepositories] = useState('');
    const [updated, setUpdated] = useState('');
    const [repository, setRepository] = useState('');

    useEffect(() => {
        if (!updated) {
            setUpdated(true);
        }
    })

    const contributors = route.params.userInfo.contributors_url;
    const issues = route.params.userInfo.issues_url;
    const full_name = route.params.userInfo.full_name;
    console.log(route.params)
    console.log(route.params.userInfo)
    console.log(contributors)
    console.log(issues)

    const openUserView = (index) => {
        navigation.navigate('User', { repoInfo : repositories[index] })
    }

    return (
        <>
            <View style={styles.container}>
                {
                repositories.length > 0 && (
                    <FlatList
                    data={repositories}
                    onEndReachedThreshold={0.8}
                    keyExtractor={(index) => index.toString()}
                    renderItem={({ element, index }) => (
                        <TouchableHighlight style={styles.item} key={index} onPress={() => openUserView(index)}>
                            <View key={index} style={styles.itemView}>
                                <View style={styles.item}><Text>{full_name}</Text></View>
                                <View style={styles.item}><Text>{issues}</Text></View>
                                <View style={styles.item}><Text>{contributors}</Text></View>
                            </View>
                        </TouchableHighlight>

                    )}
                />
                )
                }
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
        marginTop: 30,
        alignContent: "center",
        fontSize: 20
    },
    repoName: {
        fontSize: 15,
    }
});