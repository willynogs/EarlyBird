import React from 'react';
import { StackNavigator } from 'react-navigation';
import Header from '../components/Header';
import Login from '../components/Login';

export default StackNavigator({
  Login: Login,
}, {
  navigationOptions: ({ navigation }) => ({
    header: <Header navigation={navigation} initialRoute='Login' />
  })
});
