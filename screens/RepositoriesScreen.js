import React from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { Button, ThemeProvider } from 'react-native-elements';

export const RepositoriesScreen = ({ navigation, route }) => {
    return (
        <Text>
        </Text>
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

