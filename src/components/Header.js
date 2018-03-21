import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: '',
      date: '',
    };
  }

  componentWillMount() {
    const day = moment().format('dddd');
    const date = moment().format('MMMM Do');
    this.setState({ day, date });
  }

  render() {
    const { day, date } = this.state;

    return (
      <View style={{ padding: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 25, fontWeight: '600' }}>{`${day} // ${date}`}</Text>
      </View>
    );
  }
}

export default Header;
