import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

class CategoryButton extends Component {
  getContainerStyle() {
    const { selected, category } = this.props;
    const { selectedCategoryContainer, categoryContainer } = styles;
    if(selected == category) {
      return selectedCategoryContainer;
    }

    return categoryContainer;
  }

  getTextStyle() {
    const { selected, category } = this.props;
    const { selectedCategoryText, categoryText } = styles;
    if(selected == category) {
      return selectedCategoryText;
    }

    return categoryText;
  }

  render() {
    const { category, set } = this.props;
    const { categoryContainer, categoryText } = styles;
    return (
      <TouchableOpacity style={this.getContainerStyle()} onPress={() => set(category)}>
        <Text style={this.getTextStyle()}>{category.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  selectedCategoryContainer: {
    borderWidth: 1,
    borderColor: '#eb685b',
    borderRadius: 7,
    backgroundColor: '#eb685b',
    padding: 10,
    marginBottom: 10
  },
  selectedCategoryText: {
    color: '#FFF',
    fontWeight: '200',
    textAlign: 'center'
  }
});

export default CategoryButton;
