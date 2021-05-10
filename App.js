import React from "react";
import { View } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UsersScreen, UserScreen, RepositoriesScreen, RepositoryScreen, FavoritesScreen, IssueScreen } from './screens'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

// https://reactnavigation.org/docs/stack-navigator/
const UserStack = createStackNavigator();
const RepositoryStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const IssueStack = createStackNavigator();
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

function FavoritesStackScreen() {
    return (
        <FavoritesStack.Navigator screenOptions={stackScreenOptions}>
            <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} />
            <FavoritesStack.Screen name="Repository" component={RepositoryScreen} />
        </FavoritesStack.Navigator>
    );
}

function IssueStackScreen() {
    return (
        <IssueStack.Navigator screenOptions={stackScreenOptions}>
            <IssueStack.Screen name="Issue" component={IssueScreen} />
        </IssueStack.Navigator>
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
                    route.name === "Users" && <AntDesign name="team" size={size} color={color} />
                }
                {
                    route.name === "Repositories" && <MaterialCommunityIcons name="source-repository" size={size} color={color} />
                }
                {
                    route.name === "Favorites" && <AntDesign name="staro" size={size} color={color} />
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
                <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App;
