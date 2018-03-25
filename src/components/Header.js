import React, { Component } from 'react';
import { Animated, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      showLeft: false,
      leftOpacity: new Animated.Value(0),
      showRight: false,
      rightOpacity: new Animated.Value(0)
    };
  }

  componentWillMount() {
    const date = moment().format('dddd, MMMM Do');
    this.setState({ date });
  }

  render() {
    const { date, leftOpacity, rightOpacity } = this.state;
    const { headerTextContainer, headerText, subText, sideButtonContainer } = styles;

    return (
      <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'center' }}>
        {this.showLeft()}

        <View style={headerTextContainer}>
          <Text style={headerText} adjustsFontSizeToFit minimumFontScale={.8}>Early Bird Times</Text>
          <Text style={subText}>{date}</Text>
        </View>

        <TouchableOpacity onPress={() => console.log('go back')}>
          <Animated.View style={{ ...sideButtonContainer, opacity: rightOpacity }}>
            <Ionicons name='ios-refresh-outline' size={40} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }

  showLeft() {
    const { sideButtonOuterContainer, sideButtonContainer } = styles;
    const { leftOpacity } = this.state;
    const { goBack } = this.props.navigation;
    const { routeName } = this.props.navigation.state;

    if(routeName === 'Home') {
      Animated.timing(leftOpacity, {
        toValue: 0,
        duration: 300
      }).start();
    } else {
      Animated.timing(leftOpacity, {
        toValue: 1,
        duration: 300
      }).start();
    }

    return (
      <TouchableOpacity onPress={() => goBack()} style={sideButtonOuterContainer}>
        <Animated.View style={{ ...sideButtonContainer, opacity: leftOpacity }}>
          <Ionicons name='ios-arrow-round-back' size={40} />
        </Animated.View>
      </TouchableOpacity>
    );
  }
} 

const styles = {
  headerTextContainer: {
    padding: 10,
    alignItems: 'center',
    minWidth: (Dimensions.get('window').width - 100)
  },
  headerText: {
    fontFamily: 'Walbaum Fraktur',
    fontSize: 40,
    fontWeight: '600',
    textDecorationLine: 'underline',
    textDecorationColor: '#eb685b'
  },
  subText: {
    fontWeight: '100'
  },
  sideButtonOuterContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  sideButtonContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default Header;
