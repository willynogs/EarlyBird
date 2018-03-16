import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as news from '../lib/news';

class News extends Component {
  constructor(props) {
    super(props);
    
    this.showLoading = this.showLoading.bind(this);
    
    this.state = {
      loading: true,
      leadLayout: {},
      articles: []
    };
  }
  
  componentWillMount() {
    news.getAll()
    .then(response => {
      const { articles } = response;
      this.setState({ articles, loading: false });
    }).catch(e => {
      console.log(e);
    });
  }
  
  render() {    
    const { containerStyle } = styles;

    return (
      <View style={containerStyle}>
        {this.showLoading()}
      </View>
    );
  }
  
  showLoading() {
    const { newsContainer, leadArticleContainer, leadArticleImage, leadArticleTitle, newsHeader } = styles;
    const { loading, articles, leadLayout } = this.state;
    
    if(loading) {
      return(
        <Text>Loading</Text>
      );
    }
    
    return (
      <View style={newsContainer}>
        <Text style={newsHeader}>NEWS</Text>
        <TouchableOpacity style={leadArticleContainer} onLayout={e => this.setState({ leadLayout: e.nativeEvent.layout })}>
          <Image source={{ uri: articles[0].urlToImage }} resizeMode={'cover'} style={{ height: '300px', width: leadLayout.width }} />
          <Text style={leadArticleTitle}>{articles[0].title}</Text>
          <Text>{articles[0].description}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center'
  },
  newsContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },
  newsHeader: {
    fontSize: 40,
    fontWeight: '800'
  },
  leadArticleContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },
  leadArticleTitle: {
    fontSize: 20,
    fontWeight: '600'
  }
});

export default News;