import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import * as traffic from '../lib/traffic';

class Traffic extends Component {
  constructor(props) {
    super(props);

    this.ref = null;

    this.state = {
      loading: true,
      locationSaved: false
    };
  }

  componentWillMount() {
    const { uid } = this.props.user;
    const { latitude, longitude } = this.props.user.coords;
    const { setTraffic } = this.props;

    this.ref = firebase.database().ref(`traffic/${uid}`);
    this.ref.on('value', (snap) => {
      console.log(snap);
      const { _value } = snap;
      if(_value) {
        const json = JSON.parse(_value);
        traffic.getTraffic({lat: latitude, lon: longitude}, {lat: json.lat, lon: json.lng})
        .then(response => {
          setTraffic(response);
          this.setState({ loading: false, locationSaved: true })
        }).catch(e => {
          console.log(e);
          this.setState({ loading: false })
        });
      } else {
        this.setState({ locationSaved: false, loading: false });
      }
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
    const { loading } = this.state;
    const { traffic } = this.props;
    const { trafficContainer, trafficHeader, trafficTime, textContainer } = styles;

    if(loading) {
      return (
        <Text>Loading</Text>
      );
    }

    return(
      <View>
        <Text style={trafficHeader}>TRAFFIC</Text>
        <View style={trafficContainer}>
          {this.showLocation()}
        </View>
      </View>
    );
  }

  showLocation() {
    const { trafficTime, trafficContainer, textContainer } = styles;
    const { locationSaved } = this.state;

    if(locationSaved) {
      return (
        <View style={trafficContainer}>
          <Ionicons name='ios-clock-outline' size={35} />
          <View style={textContainer}>
            <Text style={trafficTime}>{this.getDuration()}</Text>
            <Text>You will arrive at {this.getArrivalTime()}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={trafficContainer}>
        <Ionicons name='ios-clock-outline' size={35} />
        <View style={textContainer}>
          <Text style={trafficTime}>No Location Saved</Text>
          <Text>Go to the settings tab to set your work location.</Text>
        </View>
      </View>
    );
  }

  getDuration() {
    const { value } = this.props.traffic.rows[0].elements[0].duration;
    const dur = moment.duration(value, 'seconds');
    const days = dur.days();
    const hours = dur.hours();
    const minutes = dur.minutes();
    const seconds = dur.seconds();
    let result;

    if(days > 0) {
      result = 'You are too far from work.';
    } else if(hours > 0) {
      result = `${hours}H ${minutes}M ${seconds}S`;
    } else if(minutes > 0) {
      result = `${minutes}M ${seconds}S`;
    } else {
      result = `${seconds} seconds`;
    }

    return result;
  }

  getArrivalTime() {
    const { value } = this.props.traffic.rows[0].elements[0].duration;
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
    fontSize: 25,
    fontWeight: '600'
  },
  trafficContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: {
    justifyContent: 'center',
    marginHorizontal: 10
  }
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Traffic);
