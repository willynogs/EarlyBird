import React, { Component } from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../config';

class PlaceSearch extends Component {
  async saveLocation(location) {
    const { goBack } = this.props.navigation;
    const { callback } = this.props.navigation.state.params;

    try {
      const str = JSON.stringify(location);
      callback(location);
      await AsyncStorage.setItem('@EarlyBird:WorkLocation', str)
      .then(() => goBack());
    } catch(e) {
      console.log(e);
      goBack();
    }
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
          this.saveLocation(details.geometry.location)
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

export default PlaceSearch;
