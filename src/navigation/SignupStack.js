import React from 'react';
import { StackNavigator } from 'react-navigation';
import Header from '../components/Header';
import Signup from '../components/Signup';

export default StackNavigator({
  Signup: Signup,
}, {
  navigationOptions: ({ navigation }) => ({
    header: <Header navigation={navigation} initialRoute='Signup' />
  })
});
