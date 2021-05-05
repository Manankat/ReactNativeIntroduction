import React from "react";
import { View } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UsersScreen, UserScreen, RepositoriesScreen, RepositoryScreen } from './screens'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// https://reactnavigation.org/docs/stack-navigator/
const UserStack = createStackNavigator();
const RepositoryStack = createStackNavigator();
const stackScreenOptions = {
    headerShown: false,
    gestureEnabled: true,
};

function UserStackScreen() {
    return (
        <UserStack.Navigator screenOptions={stackScreenOptions}>
            <UserStack.Screen name="Users" component={UsersScreen} />
            <UserStack.Screen name="User" component={UserScreen} />
        </UserStack.Navigator>
    );
}

function RepositoryStackScreen() {
    return (
        <RepositoryStack.Navigator screenOptions={stackScreenOptions}>
            <RepositoryStack.Screen name="Repositories" component={RepositoriesScreen} />
            <RepositoryStack.Screen name="Repository" component={RepositoryScreen} />
        </RepositoryStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
const ActiveColor = "#000000";
const InActiveColor = "#00000077";
const tabScreenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
        return (
            <View style={{ alignItems: "center" }}>
                {
                    route.name === "Users" ?
                        <AntDesign name="team" size={size} color={color} />
                        :
                        <MaterialCommunityIcons name="source-repository" size={size} color={color} />
                }
            </View>
        );
    },
});
const tabBarOptions = {
    activeTintColor: ActiveColor,
    inactiveTintColor: InActiveColor,
};

function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={tabScreenOptions}
                tabBarOptions={tabBarOptions}
            >
                <Tab.Screen name="Users" component={UserStackScreen} />
                <Tab.Screen name="Repositories" component={RepositoryStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App;
