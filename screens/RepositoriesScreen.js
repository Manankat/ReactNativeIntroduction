import React from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { Button, ThemeProvider } from 'react-native-elements';

export const RepositoriesScreen = ({ navigation, route }) => {
    const [username, setName] = useState('');
    const [login, setLogin] = useState('');
    const [error, setError] = useState('');
    const [uInput, setUInput] = useState('');

    const setData = ({
        username
    }) => {
      setName(username);
    }

    const userResearch = (e) => {
        setUInput(e);
        console.log(e)
    }

    const userSubmit = () => {
        username = username.toLowerCase().trim();
        fetch(`https://api.github.com/users/${username}/repos`)
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
            placeholder='Users'
            onChangeText={(uInput) =>
                userResearch(uInput)
            }
            defaultValue={uInput}
        />
        <Button
            title='Search Users'
            style={styles.button}
            onPress={() =>
                userSubmit()
            }
        />
        <Text>{username} {login}</Text>
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

