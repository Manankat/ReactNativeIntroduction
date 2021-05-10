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

export default class getIssuesbyOwnerandRepository extends Component {
  state = {
    repository: '',
    owner: '',
    issues: [],
  }

  handleChangeRepo = (evt) => {
    this.setState({
      repository: evt.nativeEvent.text
    });
  }

  handleChangeOwner = (evt) => {
    this.setState({
      owner: evt.nativeEvent.text
    });
  }

  getRepoIssues = (repository, owner) => {
    repository = repository.toLowerCase().trim();
    owner = owner.toLowerCase().trim();
    const url = `https://api.github.com/repos/${owner}/${repository}/issues`;
    return fetch(url).then((res) => res.json());
  }

  handleSubmit = () => {
    this.getRepoIssues(this.state.repository, this.state.owner)
      .then((res) => {
        this.setState({issues: res});
      });
  }

  renderRepos = () => {
    return (
      <ScrollView>
        {
          this.state.issues.map((issue, i) => {
            return (
              <View key={i}>
                <Text>{i}, {JSON.stringify(issue.number)}</Text>
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
        <Text style={styles.label}>GitHub Owner</Text>
        <TextInput
          placeholder="Enter your github owner"
          style={styles.input}
          onChange={this.handleChangeOwner}
        />
        <Text style={styles.label}>GitHub Username</Text>
        <TextInput
          placeholder="Enter your github repository"
          style={styles.input}
          onChange={this.handleChangeRepo}
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
