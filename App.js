import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

const App = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
					<Text style={styles.subTitle}>Workshop</Text>
				</View>
      </SafeAreaView>
      <View >
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            placeholder="Type Here..."
            value={search}
          />
      </View>
    </>
  );
};

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
});

export default App;