import React from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { Button, ThemeProvider } from 'react-native-elements';

export const RepositoryScreen = ({ navigation, route }) => {
    const [repository, setName] = useState('');
    const [login, setLogin] = useState('');
    const [error, setError] = useState('');
    const [uInput, setUInput] = useState('');

    const setData = ({
        repository
    }) => {
      setName(repository);
    }

    const repositoryResearch = (e) => {
        setUInput(e);
        console.log(e)
    }

    const repositorySubmit = () => {
        repository = repository.toLowerCase().trim();
        fetch(`https://api.github.com/repos/${repository}`)
          .then(res => res.json())
          .then(data => {
            if (data.message) {
                  setError(data.message)
            } else {
                  setData(data);
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
                repositoryResearch(uInput)
            }
            defaultValue={uInput}
        />
        <Button
            title='Search Users'
            style={styles.button}
            onPress={() =>
                repositorySubmit()
            }
        />
        <Text>{repository} {login}</Text>
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