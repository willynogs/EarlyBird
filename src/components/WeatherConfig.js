import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../config';

class WeatherConfig extends Component {
  render() {
    return (
      <View>
        <View>

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
            console.log(details.geometry.location);
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
      </View>
    );
  }
}

export default WeatherConfig;
