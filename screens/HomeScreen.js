import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ padding: 10, flex: 1 }}>
            <View style={styles.row}>
                {
                    ["Repositories", "Users"].map((screen) => {
                        return (
                            <TouchableOpacity
                                key={screen}
                                onPress={() => {
                                    navigation.navigate(screen)
                                }}
                                style={styles.button}
                            >
                                <Text
                                    style={styles.buttonLabel}
                                >
                                    {screen}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
        backgroundColor: "aliceblue",
    },
    box: {
        width: 50,
        height: 50,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: "oldlace",
        alignSelf: "flex-start",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
    },
    selected: {
        backgroundColor: "coral",
        borderWidth: 0,
    },
    buttonLabel: {
        fontSize: 14,
        fontWeight: "700",
        color: "coral",
    },
    selectedLabel: {
        color: "white",
    },
    label: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 24,
    },
});
