import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';

export default class getRepositoriesbyUsername extends Component {
  state = {
    username: '',
    repos: [],
  }

  handleChange = (evt) => {
    this.setState({
      username: evt.nativeEvent.text
    });
  }

  getUserRepos = (username) => {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}/repos`;
    return fetch(url).then((res) => res.json());
  }

  handleSubmit = () => {
    this.getUserRepos(this.state.username)
      .then((res) => {
        this.setState({repos: res});
      });
  }

  renderRepos = () => {
    return (
      <ScrollView>
        {
          this.state.repos.map((repo, i) => {
            return (
              <View key={i}>
                <Text>{i}, {JSON.stringify(repo.full_name)}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>GitHub Username</Text>
        <TextInput
          placeholder="Enter your github username"
          style={styles.input}
          onChange={this.handleChange}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={this.handleSubmit}
          >
          <Text style={styles.buttonText}>VIEW</Text>
        </TouchableOpacity>
        { this.renderRepos() }
      </View>
    );
  }
}

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