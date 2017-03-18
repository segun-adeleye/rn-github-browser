'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import SearchResults from './SearchResults';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: 'nnnnn'
    };
  }
  render() {
    return(
      <View style={styles.container}>
        <TextInput style={{
            height: 50,
            marginTop: 10,
            padding: 4,
            fontSize: 18,
            borderWidth: 1,
            borderColor: '#48bbec',
            alignSelf: 'stretch'
          }}
          placeholder='Search Query'
          onChangeText={text => this.setState({
            searchQuery: text
          })}
        />
      <TouchableHighlight style={{
          height: 50,
          backgroundColor: '#48bbec',
          alignSelf: 'stretch',
          marginTop: 10,
          justifyContent: 'center'
        }}
        onPress={this.onSearchPressed.bind(this)}>
        <Text style={{
            alignSelf: 'center',
            fontSize: 22,
            color: '#fff'
          }}>Search</Text>
      </TouchableHighlight>
      </View>
    )
  }

  onSearchPressed() {
    console.log('Searching for...', this.state.searchQuery);
    this.props.navigator.push({
      title: 'Results',
      component: SearchResults,
      passProps: {
        searchQuery: this.state.searchQuery
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5fcff',
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
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
