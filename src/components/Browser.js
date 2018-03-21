import React, { Component } from 'react';
import { View, WebView } from 'react-native';

class Browser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { url } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{uri: url}}
        />
      </View>
    );
  }
}

export default Browser;
