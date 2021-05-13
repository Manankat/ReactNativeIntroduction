import React from "react";
import { Text } from "react-native";
import { BackgroundColor } from "../constants";
import {
    StyleSheet,
    View,
} from 'react-native';

export function MainHeader({ title }) {
    return (
        <View
            style={{
                backgroundColor: BackgroundColor,
                height: 60,
                borderBottomColor: '#f2f2f2',
                borderBottomWidth: StyleSheet.hairlineWidth,
                paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Text style={{
                color: "#fff",
            }}>
                {title}
            </Text>
        </View>
    );
}
