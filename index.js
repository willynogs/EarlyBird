import React from 'react';
import { AppRegistry } from 'react-native';
import AppComponent from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
let store = createStore(reducers);

const App = (props) => {
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  );
};

console.disableYellowBox = true;
AppRegistry.registerComponent('EarlyBirdAssistant', () => App);
