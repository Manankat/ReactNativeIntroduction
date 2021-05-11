import React from "react";
import { Header, Icon, Text } from "react-native-elements";
import { BackgroundColor } from "../constants";
import {
  StyleSheet,
  View,
} from 'react-native';

export function MainHeader({ navigation, isMain, title }) {
  if (isMain) {
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
  } else {
    return (
      <Header
        containerStyle={{
          backgroundColor: BackgroundColor,
          borderBottomWidth: 0,
        }}
        leftComponent={
          <Icon
            name="keyboard-arrow-left"
            color="#fff"
            size={40}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
        centerComponent={{ text: title, style: { color: "#fff" } }}
      />
    );
  }
}
