import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function addFavorites(value) {
    try {
        const strFavorites = await AsyncStorage.getItem('favorites')
        var favorites = strFavorites != null ? JSON.parse(strFavorites) : [];

        favorites.push(value)
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites))
    } catch (e) {
        // saving error
    }
}

export async function removeFavorites(value) {
    try {
        const strFavorites = await AsyncStorage.getItem('favorites')
        var favorites = strFavorites != null ? JSON.parse(strFavorites) : [];


        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id === value.id) {
                favorites.splice(i, 1);
            }
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favorites))
    } catch (e) {
        // saving error
    }
}


export async function getFavorites() {
    try {
        const jsonValue = await AsyncStorage.getItem('favorites')
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        // error reading value
    }
}

export async function favoriteIsPresent(value) {
    try {
        const strFavorites = await AsyncStorage.getItem('favorites')
        var favorites = strFavorites != null ? JSON.parse(strFavorites) : [];

        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id === value.id) {
                return true
            }
        }

        return false
    } catch (e) {
        // saving error
    }
}