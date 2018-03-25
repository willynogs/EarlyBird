import React from 'react';
import { StackNavigator } from 'react-navigation';
import Root from '../components/Root';
import Browser from '../components/Browser';
import PlaceSearch from '../components/PlaceSearch';
import Header from '../components/Header';

export default StackNavigator({
  Home: {
    screen: Root
  },
  Browser: Browser,
  Search: PlaceSearch
}, {
  navigationOptions: ({ navigation }) => ({
    header: <Header navigation={navigation} />
  })
});
