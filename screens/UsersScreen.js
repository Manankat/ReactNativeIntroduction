import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Button, TextInput, Text, Image } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';

export const UsersScreen = ({ navigation, route }) => {
    const [search, setText] = useState('');
    const [searchResults, setResults] = useState('');
    
    const openUserView = (index) => {
        navigation.navigate('User', { userInfo : searchResults[index] })
    }

    const userSubmit = () => {
        var A = search.toLowerCase().trim();
        fetch(`https://api.github.com/search/users?q=${A}`)
            .then(res => res.json())
            .then(data => {
              if (data.message) {
                    setError(data.message)
              } else {
                  setResults(data.items);
              }
          })
          .catch((error) => {
              console.log(error)
          })
    }

    return (
      <>
          <View style={styles.container}>
              <View style={styles.header}>
                  <View style={{flex:4}}>
                      <TextInput style={styles.textInput} onChangeText={search => setText(search)} placeholder="Type Here..."/>
                  </View>
                  <View style={{flex:1, margin: 13}}>
                      <Button style={styles.button} title="Search" color="green" onPress={userSubmit}/>          
                  </View>
              </View>
              <ScrollView>
                  {
                      (searchResults ? searchResults.map((element, index) => {
                          return (<TouchableHighlight style={styles.item} key={index} onPress={() => openUserView(index)}>
                          <View style={styles.itemView}>
                              <Image
                                  style={styles.avatar}
                                  source={element.avatar_url}
                              />
                              <Text style={styles.name}>{element.login}</Text>
                          </View>
                          </TouchableHighlight>)
                      }) : "")
                  }
              </ScrollView>
            </View>
      </>
    );
  };

  
const styles = StyleSheet.create({
    header: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: '#ecf0f1',
      position: "sticky",
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
      justifyContent: "flex-end",
      alignItems: 'center',
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
  