import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as weather from '../lib/weather';

class Weather extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      weather: {}
    };
  }
  
  componentWillMount() {
    weather.get('Los+Angeles')
    .then(response => {
      console.log(response);
      this.setState({ loading: false, weather: response });
    }).catch(e => {
      console.log(e);
    })
  }
  
  render() {
    return (
      <View>
        {this.showLoading()}
      </View>
    );
  }
  
  showLoading() {
    const { loading, weather } = this.state;
    const { weatherHeader } = styles;
    
    if(loading) {
      return (
        <View><Text>Loading</Text></View>
      );
    }
    
    return (
      <View>
        <Text style={weatherHeader}>WEATHER</Text>
        <Text>{weather.name}</Text>
        <Text>Temp: {weather.main.temp}</Text>
      </View>
    );
  }
}

const styles = {
  weatherHeader: {
    fontSize: 40,
    fontWeight: '800'
  },
};

export default Weather;