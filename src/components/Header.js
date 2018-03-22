import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: ''
    };
  }

  componentWillMount() {
    const date = moment().format('dddd, MMMM Do');
    this.setState({ date });
  }

  render() {
    const { date } = this.state;
    const { headerText, subText } = styles;

    return (
      <View style={{ padding: 10, alignItems: 'center' }}>
        <Text style={headerText}>Early Bird Times</Text>
        <Text style={subText}>{`${date}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Walbaum Fraktur',
    fontSize: 40,
    fontWeight: '600',
    textDecorationLine: 'underline',
    textDecorationColor: '#eb685b'
  },
  subText: {
    fontWeight: '100'
  }
});

export default Header;
