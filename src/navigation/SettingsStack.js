import React from 'react';
import { StackNavigator } from 'react-navigation';
import Settings from '../components/Settings';
import TrafficConfig from '../components/TrafficConfig';
import WeatherConfig from '../components/WeatherConfig';
import NewsConfig from '../components/NewsConfig';
import Header from '../components/Header';

export default StackNavigator({
  SettingsHome: Settings,
  TrafficConfig: TrafficConfig,
  WeatherConfig: WeatherConfig,
  NewsConfig: NewsConfig
}, {
  navigationOptions: ({ navigation }) => ({
    header: <Header navigation={navigation} initialRoute='SettingsHome' />
  })
});
