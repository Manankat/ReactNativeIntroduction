import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

/*

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
        */

export const HomeScreen = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState("");

    return (
        <View style={{ padding: 10, flex: 1 }}>
            <View style={styles.row}>
                {
                    ["Repositories", "Users"].map((screen) => {
                        return (
                            <TouchableOpacity
                                key={screen}
                                onPress={() => {
                                    setSelectedValue(screen)
                                    navigation.navigate(screen)
                                }}
                                style={[
                                    styles.button,
                                    selectedValue === screen && styles.selected,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.buttonLabel,
                                        selectedValue === screen && styles.selectedLabel,
                                    ]}
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
