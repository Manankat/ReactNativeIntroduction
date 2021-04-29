import React,{useState, useEffect} from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { Button } from 'react-native-elements';

export const RepositoriesScreen = ({ navigation, route }) => {
    const [repositories, setRepositories] = useState('');
    const [error, setError] = useState('');
    const [uInput, setUInput] = useState('');

    const setData = ({
        repositories
    }) => {
        setRepositories(repositories);
    }

    const repositoriesResearch = (e) => {
        setUInput(e);
    }

    const repositoriesSubmit = () => {
        var a = uInput.toLowerCase().trim();
        fetch(`https://api.github.com/search/repositories?q=${a}`)
          .then(res => res.json())
          .then(data => {
            if (data.message) {
                  setError(data.message);
            } else {
                console.log(data)
                  setRepositories(data.items);
                  setError(null);
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
        <TextInput
            style={styles.userInput}
            placeholder='Search repositories'
            onChangeText={(uInput) =>
                repositoriesResearch(uInput)
            }
            defaultValue={uInput}
        />
        <Button
            title='Search Users'
            style={styles.button}
            onPress={() =>
                repositoriesSubmit()
            }
        />
        <ScrollView>
            {(repositories?repositories.map((repo, i)=>{
                    return(
                        <View key={i} style={styles.block_repo}>
                            <View style={styles.block_content}><Text>{repo.full_name}</Text></View>
                            <View style={styles.block_content}><Text>{repo.private}</Text></View>
                            <View style={styles.block_content}><Text>{repo.description}</Text></View>
                            <View style={styles.block_content}><Text>{repo.forks}</Text></View>
                            <View style={styles.block_content}><Text>{repo.size}</Text></View>
                            <View style={styles.block_content}><Text>{repo.default_branch}</Text></View>
                        </View>
                    )
                }):"")
            }
        </ScrollView>
    </>
    )
};

const styles = StyleSheet.create({
    block_repo: {
        borderRadius: 20,
        fontSize:14,
        margin:10,
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#FAFAD2',
    },
    block_content: {
        padding:5,
        borderWidth: 2,
        borderRadius:10,
        margin:10,
        backgroundColor:'white',
    },
    header: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: '#ecf0f1',
      position: "absolute",
      width: "100%",
      top: 0,
      zIndex: 10
    },
    textInput:{
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
        marginTop:20,
      justifyContent: "flex-end",
      alignItems: 'center',
    },
    scroll: {
    },
    item : {
      width: "100%",
      marginBottom: 5,
      backgroundColor: "#d6d6d6",
      flexDirection: "row",
      height: 50,
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