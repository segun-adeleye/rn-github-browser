import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  ActivityIndicator,
  Image,
  TouchableHighlight
} from 'react-native';

import authService from './AuthService';
import PushPayload from './PushPayload';
import moment from 'moment';

export default class Feed extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds,
      showProgress: true
    };
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    authService.getAuthInfo((err, authInfo) => {
      let url = 'https://api.github.com/users/'
                + authInfo.user.login
                + '/received_events';
      fetch(url, {
        headers: authInfo.header
      })
      .then(response => response.json())
      .then(results => {
        console.log(results);
        let feedItems = results.filter(ev => ev.type === 'PushEvent');
        console.log(feedItems);
        this.setState({
          dataSource: this.state.dataSource
            .cloneWithRows(feedItems),
          showProgress: false
        });
      })
      .catch(err => {
        console.error('error => ', err);
      });
    });
  }

  renderRow(rowData) {
    return(
      <TouchableHighlight onPress={() => this.pressRow(rowData)}
        underlayColor='#ddd'>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
          borderColor: '#d7d7d7',
          borderBottomWidth: 1
        }}
        >
          <Image source={{uri: rowData.actor.avatar_url}}
            style={{
              height: 36,
              width: 36,
              borderRadius: 18
            }}
            />
          <View style={{paddingLeft: 20}}>
            <Text>{moment(rowData.created_at).fromNow()}</Text>
            <Text>{rowData.actor.login}</Text>
            <Text>{rowData.payload.ref.replace('refs/heads/', '')}</Text>
            <Text>at {rowData.repo.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  pressRow(rowData) {
    this.props.navigator.push({
      title: 'Push Event',
      component: PushPayload,
      passProps: {
        pushEvent: rowData
      }
    });
  }

  render() {
    if (this.state.showProgress) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}
        >
          <ActivityIndicator
            size="large"
            animating={true}
             />
        </View>
      );
    }

    return(
      <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          paddingTop: 60
        }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}
