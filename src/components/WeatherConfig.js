import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import firebase from 'react-native-firebase';
import config from '../../config';

class WeatherConfig extends Component {
  constructor(props) {
    super(props);

    this.ref = null;
    this.state = {};
  }

  useCurrentLocation() {
    const { uid } = this.props.user;
    const { goBack } = this.props.navigation;
    this.ref.remove(uid)
    .then(() => {
      goBack();
    });
  }

  saveWeather(location) {
    const { uid } = this.props.user;
    const { goBack } = this.props.navigation;
    const str = JSON.stringify(location);
    let obj = {};
    obj[uid] = str;
    this.ref.update(obj)
    .then(() => {
      goBack();
    });
  }

  componentWillMount() {
    this.ref = firebase.database().ref('weather');
  }

  render() {
    const { currentButtonContainer, currentButton, currentButtonText } = styles;

    return (
      <View style={{ flex: 1 }}>
        <View style={currentButtonContainer}>
          <TouchableOpacity style={currentButton} onPress={this.useCurrentLocation.bind(this)}>
            <Text style={currentButtonText}>ALWAYS USE CURRENT LOCATION</Text>
          </TouchableOpacity>
        </View>

        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed='auto'
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            this.saveWeather(details.geometry.location);
          }}

          getDefaultValue={() => ''}

          query={{
            key: config.maps_key,
            language: 'en',
            types: '(regions)'
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  currentButtonContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: '#FFF'
  },
  currentButton: {
    backgroundColor: '#eb685b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    paddingVertical: 12,
    paddingHorizontal: 10
  },
  currentButtonText: {
    color: '#FFF'
  }
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherConfig);
