'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  ActivityIndicator,
  StyleSheet,
  Image
} from 'react-native'

import fork from './assets/fork.png';
import star from './assets/star.png';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds,
      showProgress: true,
      searchQuery: props.searchQuery
    };
  }

  componentDidMount() {
    this.doSearch();
  }

  doSearch() {
    let url = 'https://api.github.com/search/repositories?q='
              + encodeURIComponent(this.state.searchQuery);
    fetch(url)
      .then(response => response.json())
      .then(results => {
        console.log(results);
        this.setState({
          repositories: results.repositories,
          dataSource: this.state.dataSource.cloneWithRows(results.items),
        });
      })
      .finally(() => {
        this.setState({
          showProgress: false
        });
      });
  }

  renderRow(rowData) {
    return(
      <View style={{
          padding: 20,
          borderColor: '#d7d7d7',
          borderBottomWidth: 1
        }}>
        <Text style={{
            fontSize: 20,
            fontWeight: '600'
          }}>{rowData.full_name}</Text>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginBottom: 20
          }}>
          <View style={styles.repoCell}>
            <Image style={styles.repoCellIcon} source={star} />
            <Text style={styles.repoCellLabel}>{rowData.stargazers_count}</Text>
          </View>
          <View style={styles.repoCell}>
            <Image style={styles.repoCellIcon} source={fork} />
            <Text>{rowData.forks_count}</Text>
          </View>
          <View style={styles.repoCell}>
            <Image style={styles.repoCellIcon} source={star} />
            <Text>{rowData.open_issues}</Text>
          </View>
        </View>
      </View>
    );
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
            size='large'
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

const styles = StyleSheet.create({
  repoCell: {
    width: 50,
    alignItems: 'center'
  },
  repoCellIcon: {
    width: 20,
    height: 20
  },
  repoCellLabel: {
    textAlign: 'center'
  }
});
