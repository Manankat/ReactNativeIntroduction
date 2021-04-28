import React,{useState, useEffect} from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, TextInput, View, AppRegistry, ScrollView } from "react-native";
import { Button, ThemeProvider } from 'react-native-elements';

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
        console.log(e)
    }

    const repositoriesSubmit = () => {
        var a = uInput.toLowerCase().trim();
        fetch(`https://api.github.com/search/repositories?q=${a}`)
          .then(res => res.json())
          .then(data => {
            if (data.message) {
                  setError(data.message)
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
            {

                (repositories ? repositories.map((repo, i)=>{
                return(
                    <View>
                        <Text>{(repo.full_name)}</Text>
                    </View>
                )
            }) : "")
            }
        </ScrollView>
    </>
    )
};


const styles = StyleSheet.create({
    header:
    {
        height: '8%',
        alignItems: 'center',
        backgroundColor: 'black',
        justifyContent: 'space-between',
    },
    itemStyle: {
        padding: 10,
    },
    subTitle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 40
    },
    button: {
        padding: 10
    }
});