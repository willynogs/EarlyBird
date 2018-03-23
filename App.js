import React from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './src/components/Header';
import Tabs from './src/navigation/Tabs';

class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 25 }}>
        <Header />
        <Tabs />
      </View>
    );
  }
}

export default App;
