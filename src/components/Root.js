import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native';
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
        {this.showLoading()}
      </View>
    );
  }

  showLoading() {
    const { container, loadingContainer } = styles;
    const { loading } = this.state;

    if(loading) {
      return (
        <View style={loadingContainer}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <Traffic navigation={this.props.navigation} />

          <Weather />

          <News navigation={this.props.navigation} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF'
  }
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
