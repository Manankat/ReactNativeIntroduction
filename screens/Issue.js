import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity,
} from "react-native";

export default function Issue({ item, navigation }) {

  function openIssueView() {
      navigation.push('Issue', { issueInfo: item })
  }

  return (
      <TouchableOpacity onPress={() => openUserView()}>
          <View style={styles.issue}>
              <View style={{ flex: 1 }}>
                  <Text style={styles.issueNumber} numberOfLines={1}>
                      {item.number}
                  </Text>
                  <Text style={styles.issueTitle} numberOfLines={3}>
                      {item.title}
                  </Text>
              </View>
          </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  issue: {
      flexDirection: "row",
      paddingVertical: 15,
  },
  issueNumber: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
  },
  issueTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
  },
});
