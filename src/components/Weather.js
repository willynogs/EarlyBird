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
    const { weatherHeader, weatherContainer, weatherLocation, textContainer } = styles;
    
    if(loading) {
      return (
        <View><Text>Loading</Text></View>
      );
    }
    
    return (
      <View>
        <Text style={weatherHeader}>WEATHER</Text>
        <View style={weatherContainer}>
          <Ionicons name='ios-sunny' size={50} />
          <View style={textContainer}>
            <Text style={weatherLocation}>{weather.name}</Text>
            <Text>{weather.main.temp}°F</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  weatherHeader: {
    fontSize: 30,
    fontWeight: '800'
  },
  weatherLocation: {
    fontSize: 20,
    fontWeight: '600'
  },
  textContainer: {
    justifyContent: 'center',
    marginHorizontal: 10
  }
};

export default Weather;