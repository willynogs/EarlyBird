import React from 'react';
import { StackNavigator } from 'react-navigation';
import Root from '../components/Root';
import Browser from '../components/Browser';
import Header from '../components/Header';

export default StackNavigator({
  Home: Root,
  Browser: Browser
}, {
  navigationOptions: ({ navigation }) => ({
    header: <Header navigation={navigation} initialRoute='Home' />
  })
});
