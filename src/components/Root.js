import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Weather from './Weather';
import News from './News';
import Traffic from './Traffic';

class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(response => {
      const { coords } = response;
      const { setUserLocation } = this.props;
      setUserLocation(coords);
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

          {this.showLoading()}

        </ScrollView>
      </View>
    );
  }

  showLoading() {
    const { loading } = this.state;

    if(loading) {
      return (
        <Text>Loading</Text>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Traffic navigation={this.props.navigation} />

        <Weather />

        <News navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25
  },
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
