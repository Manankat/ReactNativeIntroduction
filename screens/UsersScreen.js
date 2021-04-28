import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Button, TextInput, Text, Image } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';

export const UsersScreen = ({ navigation, route }) => {
    const [search, setText, searchResults] = useState('');
    const items = [
        {
            name: "oui"
        },
        {
            name: "non"
        },
        {
            name: "o"
        },
        {
            name: "i"
        },
        {
            name: "u"
        },
        {
            name: "n"
        },
        {
            name: "oui"
        },
        {
            name: "non"
        },
        {
            name: "o"
        },
        {
            name: "i"
        },
        {
            name: "u"
        },
        {
            name: "n"
        }
    ]
      
    const openUserView = (e) => {
        navigation.navigate('User', { userInfo : items[e]})
    }

    return (
      <>
          <View style={styles.container}>
              <View style={styles.header}>
                  <View style={{flex:4}}>
                      <TextInput style={styles.textInput} placeholder="Type Here..."/>
                  </View>
                  <View style={{flex:1, margin: 13}}>
                      <Button style={styles.button} title="Search" color="green" onChangeText={search => setText(search)}/>          
                  </View>
              </View>
              <ScrollView style={styles.scroll}>
                  {
                      (items ? items.map((element, index) => {
                          return (<TouchableHighlight style={styles.item} key={index} onPress={() => openUserView(index)}>
                          <View style={styles.itemView}>
                              <Image
                                  style={styles.avatar}
                                  source="https://s1.qwant.com/thumbr/0x380/b/4/7c24c765849af68c22bd08489618a7e455dd988e748e735ec03b6284a9e523/img_410627.png?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_410627.png&q=0&b=1&p=0&a=0"
                              />
                              <Text style={styles.name}>{element.name}</Text>
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
      position: "absolute",
      width: "100%",
      top: 0
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
    scroll: {
      top: 70,
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
  