import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, UsersScreen, UserScreen, RepositoriesScreen, RepositoryScreen } from './screens'

const Stack = createStackNavigator();


const App = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={UsersScreen}
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


export default App;
