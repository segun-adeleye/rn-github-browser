import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS
} from 'react-native';

import Octocat from './assets/Octocat.png';
import authService from './AuthService';
import Feed from './Feed';
import Search from './Search';

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'feed'
    }
  }

  render() {
    return(
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title='Feed'
          selected={this.state.selectedTab == 'feed'}
          icon={require('./assets/inbox.png')}
          onPress={() => this.setState({selectedTab: 'feed'})}
        >
          <NavigatorIOS style={{
              flex: 1
            }}
            initialRoute={{
              component: Feed,
              title: 'Feed'
            }}>
          </NavigatorIOS>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Search'
          selected={this.state.selectedTab == 'search'}
          icon={require('./assets/search.png')}
          onPress={() => this.setState({selectedTab: 'search'})}
        >
          <NavigatorIOS style={{
              flex: 1
            }}
            initialRoute={{
              component: Search,
              title: 'Search'
            }}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
