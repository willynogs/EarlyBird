import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Header from './Header';
import Weather from './Weather';
import News from './News';
import Traffic from './Traffic';

class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      coords: {}
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(response => {
      const { coords } = response;
      this.setState({ coords, loading: false });
    });
  }

  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {this.showLoading()}

      </ScrollView>
    );
  }

  showLoading() {
    const { loading, coords } = this.state;

    if(loading) {
      return (
        <Text>Loading</Text>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Header />

        <Traffic coords={coords} navigation={this.props.navigation} />

        <Weather coords={coords} />

        <News navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 25
  },
});

export default Root;
