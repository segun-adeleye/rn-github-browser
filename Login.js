import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import Octocat from './assets/Octocat.png';
import authService from './AuthService';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false
    }
  }

  render() {
    let errorCtrl = <View />
    if (!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>
        Username or password is incorrect
      </Text>
    }

    if (!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>
        Ops!!! We are looking right into this ASAP!!!
      </Text>
    }
    return(
      <View style={styles.container}>
        <Image style={styles.logo} source={Octocat} />
        <Text style={styles.heading}>Github Browsersss</Text>
        <TextInput style={styles.input}
          placeholder='Github username'
          onChangeText={text => this.setState({username: text})}
          underlineColorAndroid="transparent"
        />
        <TextInput style={styles.input}
          placeholder='Github password'
          onChangeText={text => this.setState({password: text})}
          secureTextEntry={true}
        />
        <TouchableHighlight style={styles.button}
          onPress={this.onLoginPressed.bind(this)}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableHighlight>
        { errorCtrl }
        <ActivityIndicator
          animating={this.state.showProgress}
          size='large'
          style={styles.loader} />
      </View>
    );
  }

  onLoginPressed() {
    this.setState({showProgress: true});
    authService.login({
      username: this.state.username,
      password: this.state.password
    }, results => {
      this.setState(Object.assign({
        showProgress: false
      }, results));

      if (this.state.success && this.props.onLogin) {
        this.props.onLogin();
      }
    });
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
    borderColor: '#48bbec',
    alignSelf: 'stretch'
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
  },
  loader: {
    marginTop: 40
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
});
