import React from 'react';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainStack from './MainStack';
import SettingsStack from './SettingsStack';

export default TabNavigator({
  Home: {
    screen: MainStack,
    navigationOptions: ({ navigation }) => ({
      title: 'Daily Brief'
    })
  },
  Settings: { screen: SettingsStack }
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;

      if (routeName == 'Home') {
        iconName = `ios-pulse${focused ? '' : '-outline'}`;
      } else if (routeName == 'Settings') {
        iconName = `ios-settings${focused ? '' : '-outline'}`;
      }

      return <Ionicons name={iconName} size={25} color={tintColor} />
    }
  }),
  tabBarOptions: {
    activeTintColor: '#eb685b',
    inactiveTintColor: 'gray'
  }
});
