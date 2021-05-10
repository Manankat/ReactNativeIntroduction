import React, {useState, useEffect} from "react";
import { StyleSheet, Text, TextInput, View, ScrollView, FlatList, TouchableHighlight} from "react-native";
import { Button } from 'react-native-elements';

export const IssueScreen = ({ navigation, route }) => {
    const [repository, setRepository] = useState('');
    const [issues, setIssues] = useState([]);
    const [issue, setIssue] = useState('');
    const [error, setError] = useState('');

    const setData = ({
        repository
    }) => {
        setRepository(repository);
    }

    //maybe something missing there

    const openIssueView = (item) => {
        navigation.navigate('Issue', { issueInfo: item })
    }

    const fetchIssues = () => {
      fetch(`https://api.github.com/`)
    }

    function renderIssue({ item }) {
        return (
            <TouchableHighlight onPress={() => openIssueView(item)} style={{ marginHorizontal: 10, marginVertical: 5 }}>
                <View style={styles.repositoyContainer}>
                    <Text style={{ flex: 4 / 7 }}>
                        {item.number}
                    </Text>
                    <Text style={{ flex: 1 / 7, textAlign: "center" }}>
                        {item.title}
                    </Text>
                    <Text style={{ flex: 1 / 7, textAlign: "center" }}>
                        {item.repository_url}
                    </Text>
                    <Text style={{ flex: 1 / 7, textAlign: "center" }}>
                        {item.labels_url}
                    </Text>

                </View>
            </TouchableHighlight>
        )
    }
    const keyExtractor = (item) => item.url;
    const renderDivider = () => <View style={styles.userSeparator}></View>;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ScrollView>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: 16
                    }}>
                        <Text style={styles.name}>
                            {issue.number}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingVertical: 15,
    },
    repositoyContainer: {
        marginBottom: 5,
        backgroundColor: "#d6d6d6",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    name: {
        marginTop: 20,
        alignContent: "center",
        fontSize: 30,
        flex: 3 / 7,
        textAlign: "center"
    },
});
