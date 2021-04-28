import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { Text, StyleSheet, TextInput, Button ,ScrollView} from 'react-native';

export const UsersScreen = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [error, setError] = useState('');
    const [uInput, setUInput] = useState('');

    // useEffect(() => {
    //     fetch("https://api.github.com/users/example")
    //       .then(res => res.json())
    //       .then(data => {
    //         setData(data);
    //       });
    // }, []);

    const setData = ({
        name,
        login
    }) => {
      setName(name);
      setLogin(login);
    }

    const userResearch = (e) => {
        setUInput(e);
        console.log(e)
    }

    const userSubmit = () => {
        fetch(`https://api.github.com/users/${uInput}`)
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

    // const displayUsers = () => {
    //     return (
    //       <ScrollView>
    //               <View>
    //                 <Text>{name}</Text>
    //                 <Text>{login}</Text>
    //               </View>
    //       </ScrollView>
    //     )
    // }

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
          <Text>{name} {login}</Text>
      </>
    // { error ? (<h1>{error}<h1/>) : { displayUsers() } }
    )
};

const styles = StyleSheet.create({
    userInput: {
        padding: 10,
        alignItems: 'center',
        textAlign: 'center',
        // justifyContent: 'space-between',
    },
    button: {
        padding: 10,
        backgroundColor: 'blue',
        alignItems: 'center',
        textAlign: 'center',
        // justifyContent: 'space-between'
    }
})
