import React from "react";
import { Button, ThemeProvider } from 'react-native-elements';
import { StyleSheet } from "react-native";

export const HomeScreen = ({ navigation }) => {
    return (
        <>
            <Button
                title="Repositories"
                style={styles.button}
                onPress={() =>
                    navigation.navigate('Repositories')
                }
            />
            <Button
                title="Users"
                style={styles.button}
                onPress={() =>
                    navigation.navigate('Users')
                }
            />
        </>
    )
}


const styles = StyleSheet.create({
    button: {
        padding: 10
    }
})