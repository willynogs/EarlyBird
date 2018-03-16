import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import Weather from './src/components/Weather';
import News from './src/components/News';

import * as traffic from './src/lib/traffic';

export default class App extends React.Component {
  getTraffic() {
    traffic.getTraffic({lat: 41.43206, lon: -81.38992}, {lat: -33.86748, lon: 151.20699})
    .then(response => {
      console.log(response);
    }).catch(e => {
      console.log(e);
    });
  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
      
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
