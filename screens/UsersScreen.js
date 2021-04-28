import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { Text, StyleSheet, TextInput, Button , ScrollView} from 'react-native';

export const UsersScreen = ({ navigation, route }) => {
    const [names, setNames] = useState([]);
    const [logins, setLogins] = useState([]);
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
        names,
        logins
    }) => {
      setNames(names);
      setLogins(logins);
    }

    const userResearch = (e) => {
        setUInput(e);
    }

    const userSubmit = () => {
        var A = uInput.toLowerCase().trim();
        fetch(`https://api.github.com/users/${A}`)
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
          <Text>{names} {logins}</Text>
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
