import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as traffic from '../lib/traffic';

class Traffic extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      traffic: {}
    };
  }
  
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(response => {
      const { latitude, longitude } = response.coords;
      traffic.getTraffic({lat: latitude, lon: longitude}, {lat: -33.86748, lon: 151.20699})
      .then(response => {
        console.log(response);
        this.setState({ loading: false, traffic: response })
      }).catch(e => {
        console.log(e);
      });
    });
  }
  
  render() {
    return (
      <View>
        {this.showLoading()}
      </View>
    );
  }
  
  showLoading() {
    const { loading, traffic } = this.state;
    const { trafficHeader } = styles;
    
    if(loading) {
      return (
        <Text>Loading</Text>
      );
    }
    
    return(
      <View>
        <Text style={trafficHeader}>TRAFFIC</Text>
        <Text>From: {traffic.origin_addresses[0]}</Text>
        <Text>To: {traffic.destination_addresses[0]}</Text>
        <Text>Estimated Arrival: {this.getArrivalTime()}</Text>
      </View>
    );
  }
  
  getArrivalTime() {
    const { value } = this.state.traffic.rows[0].elements[0].duration;
    const current = Date.now();
    const milliseconds = current + (value * 1000);
    const arrivalTime = new Date(milliseconds);
    const arrivalString = `${arrivalTime.getHours()}:${arrivalTime.getMinutes()}:${arrivalTime.getSeconds()}`
    return arrivalString;
  }
}

const styles = StyleSheet.create({
  trafficHeader: {
    fontSize: 40,
    fontWeight: '800'
  },
});

export default Traffic;