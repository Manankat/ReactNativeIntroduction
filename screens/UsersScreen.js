import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { Text, StyleSheet, TextInput, Button , ScrollView} from 'react-native';

export const UsersScreen = ({ navigation, route }) => {
    const [names, setNames] = useState([]);
    const [logins, setLogins] = useState([]);
    const [error, setError] = useState('');
    const [uInput, setUInput] = useState('');

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
