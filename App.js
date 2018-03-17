import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import Header from './src/components/Header';
import Weather from './src/components/Weather';
import News from './src/components/News';
import Traffic from './src/components/Traffic';


export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
        <Header />
      
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
    marginTop: 20,
    paddingHorizontal: 25
  },
});
