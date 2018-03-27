import React from 'react';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginStack from './LoginStack';
import SignupStack from './SignupStack';

export default TabNavigator({
  Login: { screen: LoginStack },
  Signup: { screen: SignupStack }
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;

      if (routeName == 'Login') {
        iconName = `ios-person${focused ? '' : '-outline'}`;
      } else if (routeName == 'Signup') {
        iconName = `ios-add${focused ? '' : '-outline'}`;
      }

      return <Ionicons name={iconName} size={25} color={tintColor} />
    }
  }),
  tabBarOptions: {
    activeTintColor: '#eb685b',
    inactiveTintColor: 'gray'
  }
});
