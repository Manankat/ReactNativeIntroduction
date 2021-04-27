import React from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, ThemeProvider } from 'react-native-elements';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
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
};

const UsersScreen = ({ navigation, route }) => {
    return (
        <Text>
        </Text>
    )
};

const UserScreen = ({ navigation, route }) => {
    return (
        <Text>
        </Text>
    )
};

const RepositoriesScreen = ({ navigation, route }) => {
    return (
        <Text>
        </Text>
    )
};

const RepositoryScreen = ({ navigation, route }) => {
    return (
        <Text>
        </Text>
    )
};


const App = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Welcome' }}
            />

            <Stack.Screen
                name="Users"
                component={UsersScreen}
                options={{ title: 'Users' }}
            />
            <Stack.Screen
                name="User"
                component={UserScreen}
                options={{ title: 'User' }}
            />
            <Stack.Screen
                name="Repositories"
                component={RepositoriesScreen}
                options={{ title: 'Repositories' }}
            />
            <Stack.Screen
                name="Repository"
                component={RepositoryScreen}
                options={{ title: 'Repository' }}
            />

        </Stack.Navigator>
    </NavigationContainer>

);

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

export default App;
