import React, { Component } from 'react';
import { ActivityIndicator, Animated, StyleSheet, View, WebView } from 'react-native';

class Browser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      webOpacity: new Animated.Value(0)
    };
  }

  render() {
    const { url } = this.props.navigation.state.params;
    const { webOpacity } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {this.showLoading()}
        <Animated.View style={{ flex: 1, opacity: webOpacity }}>
          <WebView
            source={{uri: url}}
            onLoadEnd={() => this.setState({ loading: false })}
          />
        </Animated.View>
      </View>
    );
  }

  showLoading() {
    const { loading, webOpacity } = this.state;
    const { loadingContainer } = styles;

    if(loading) {
      return (
        <View style={loadingContainer}>
          <ActivityIndicator />
        </View>
      );
    } else {
      Animated.timing(webOpacity, {
        toValue: 1,
        duration: 300
      }).start();
    }
  }
}

const styles = StyleSheet.create({
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

export default Browser;
