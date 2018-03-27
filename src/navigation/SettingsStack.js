import React from 'react';
import { StackNavigator } from 'react-navigation';
import Settings from '../components/Settings';
import PlaceSearch from '../components/PlaceSearch';
import Header from '../components/Header';

export default StackNavigator({
  SettingsHome: Settings,
  PlaceSearch: PlaceSearch
}, {
  navigationOptions: ({ navigation }) => ({
    header: <Header navigation={navigation} initialRoute='SettingsHome' />
  })
});
