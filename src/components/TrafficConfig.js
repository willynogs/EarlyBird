import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import firebase from 'react-native-firebase';
import * as traffic from '../lib/traffic';
import config from '../../config';

class TrafficConfig extends Component {
  constructor(props) {
    super(props);

    this.ref = null;
    this.state = {};
  }

  saveLocation(location) {
    const { goBack } = this.props.navigation;
    const { latitude, longitude } = this.props.user.coords;
    const { setTraffic } = this.props;

    try {
      const { uid } = this.props.user;
      const str = JSON.stringify(location);
      let obj = {};
      obj[uid] = str;
      this.ref.update(obj)
      .then((reference) => {
        traffic.getTraffic({lat: latitude, lon: longitude}, {lat: location.lat, lon: location.lng})
        .then(response => {
          setTraffic(response);
          goBack();
        }).catch(e => {
          console.log(e);
          goBack();
        });
      });
    } catch(e) {
      console.log(e);
      goBack();
    }
  }

  componentWillMount() {
    this.ref = firebase.database().ref('traffic');
  }

  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2}
        autoFocus={false}
        returnKeyType={'search'}
        listViewDisplayed='auto'
        fetchDetails={true}
        renderDescription={row => row.description}
        onPress={(data, details = null) => {
          this.saveLocation(details.geometry.location);
        }}

        getDefaultValue={() => ''}

        query={{
          key: config.maps_key,
          language: 'en',
        }}

        styles={{
          textInputContainer: {
            width: '100%'
          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={200}
      />
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TrafficConfig);
