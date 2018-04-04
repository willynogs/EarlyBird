import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import firebase from 'react-native-firebase';
import CategoryButton from './common/CategoryButton';

class NewsConfig extends Component {
  constructor(props) {
    super(props);

    this.ref = null;
    this.state = {};
  }

  setCategory(selected) {
    const { uid } = this.props.user;
    const { category } = this.props.news;

    if(selected == category) {
      this.ref.remove(uid);
    } else {
      let obj = {};
      obj[uid] = selected;
      this.ref.update(obj);
    }
  }

  componentWillMount() {
    this.ref = firebase.database().ref('news');
  }

  render() {
    const { container, sectionHeading, categoryContainer, categoryText } = styles;
    const { category } = this.props.news;

    return (
      <View style={container}>
        <Text style={sectionHeading}>BRIEF CATEGORY</Text>

        <CategoryButton category='business' selected={category} set={this.setCategory.bind(this)} />
        <CategoryButton category='entertainment' selected={category} set={this.setCategory.bind(this)} />
        <CategoryButton category='general' selected={category} set={this.setCategory.bind(this)} />
        <CategoryButton category='health' selected={category} set={this.setCategory.bind(this)} />
        <CategoryButton category='science' selected={category} set={this.setCategory.bind(this)} />
        <CategoryButton category='sports' selected={category} set={this.setCategory.bind(this)} />
        <CategoryButton category='technology' selected={category} set={this.setCategory.bind(this)} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 25
  },
  sectionHeading: {
    fontSize: 30,
    color: '#eb685b',
    fontWeight: '200',
    textAlign: 'center',
    marginBottom: 15
  },
  categoryContainer: {
    borderWidth: 1,
    borderColor: '#eb685b',
    borderRadius: 7,
    padding: 10,
    marginBottom: 10
  },
  categoryText: {
    color: '#eb685b',
    fontWeight: '200',
    textAlign: 'center'
  }
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsConfig);
