import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight
} from 'react-native';
import Octocat from './assets/Octocat.png'

export default class Login extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Image style={styles.logo}
          source={Octocat} />
        <Text style={styles.heading}>Github Browser</Text>
        <TextInput style={styles.input}
          placeholder='Github username'
        />
        <TextInput style={styles.input}
          placeholder='Github password'
        />
      <TouchableHighlight style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5fcff',
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    padding: 10
  },
  logo: {
    width: 65,
    height: 56,
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48bbec',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    alignSelf: 'center'
  }
});
