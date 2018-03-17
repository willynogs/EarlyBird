import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import Weather from './src/components/Weather';
import News from './src/components/News';
import Traffic from './src/components/Traffic';


export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
      
        <Traffic />
      
        <Weather />
        
        <News />
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 25
  },
});
