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
    repository: '',
    repos: [],
  }

  handleChange = (evt) => {
    this.setState({
      repository: evt.nativeEvent.text
    });
  }

  getRepository = (repository) => {
    repository = repository.toLowerCase().trim();
    const url = `https://api.github.com/repos/${repository}`;
    return fetch(url).then((res) => res.json());
  }

  handleSubmit = () => {
    this.getRepository(this.state.repository)
      .then((res) => {
        this.setState({repos: res});
      });
  }

  renderRepos = () => {
    return (
      <ScrollView>
              <View>
                <Text>{JSON.stringify(this.state.repos.full_name), JSON.stringify(this.state.repos.html_url)}</Text>
              </View>
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>GitHub Username</Text>
        <TextInput
          placeholder="Enter your github username/repository"
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