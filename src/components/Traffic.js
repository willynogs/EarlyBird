import React, { Component } from 'react';
import { AsyncStorage, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import * as traffic from '../lib/traffic';

class Traffic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      locationSaved: false,
      traffic: {}
    };
  }

  async componentWillMount() {
    const { latitude, longitude } = this.props.coords;

    try {
      const value = await AsyncStorage.getItem('@EarlyBird:WorkLocation');
      if (value !== null){
        const json = JSON.parse(value);
        traffic.getTraffic({lat: latitude, lon: longitude}, {lat: json.lat, lon: json.lng})
        .then(response => {
          this.setState({ loading: false, locationSaved: true, traffic: response })
        }).catch(e => {
          console.log(e);
          this.setState({ loading: false })
        });
      } else {
        this.setState({ locationSaved: false, loading: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({ locationSaved: false, loading: false });
    }
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
    const { trafficContainer, trafficHeader, trafficTime, textContainer } = styles;

    if(loading) {
      return (
        <Text>Loading</Text>
      );
    }

    return(
      <View>
        <TouchableOpacity onPress={() => this.chooseLocation()}>
          <Text style={trafficHeader}>TRAFFIC</Text>
        </TouchableOpacity>
        <View style={trafficContainer}>
          <Ionicons name='ios-car' size={50} />
          {this.showLocation()}
        </View>
      </View>
    );
  }

  setLocation(location) {
    const { latitude, longitude } = this.props.coords;

    traffic.getTraffic({lat: latitude, lon: longitude}, {lat: location.lat, lon: location.lng})
    .then(response => {
      this.setState({ traffic: response, locationSaved: true });
    }).catch(e => {
      console.log(e);
    });
  }

  chooseLocation() {
    const { navigate } = this.props.navigation;
    navigate('Search', { callback: this.setLocation.bind(this) });
  }

  showLocation() {
    const { trafficTime, textContainer } = styles;
    const { locationSaved } = this.state;

    if(locationSaved) {
      return (
        <View style={textContainer}>
          <Text style={trafficTime}>{this.getDuration()}</Text>
          <Text>You will arrive at {this.getArrivalTime()}</Text>
        </View>
      );
    }

    return (
      <View style={textContainer}>
        <Text style={trafficTime}>No Location Saved</Text>
        <Text>Click TRAFFIC above to set your work location.</Text>
      </View>
    );
  }

  getDuration() {
    const { value } = this.state.traffic.rows[0].elements[0].duration;
    const dur = moment.duration(value, 'seconds');
    return `${dur.hours() > 0 ? dur.hours() + ' Hours ' : ''}${dur.minutes() > 0 ? dur.minutes() + ' Minutes' : ''}`;
  }

  getArrivalTime() {
    const { value } = this.state.traffic.rows[0].elements[0].duration;
    return moment().add(value, 's').format('h:mm:ss a');
  }
}

const styles = StyleSheet.create({
  trafficContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25
  },
  trafficHeader: {
    fontSize: 30,
    color: '#eb685b',
    fontWeight: '200'
  },
  trafficTime: {
    fontSize: 20,
    fontWeight: '600'
  },
  textContainer: {
    justifyContent: 'center',
    marginHorizontal: 10
  }
});

export default Traffic;
