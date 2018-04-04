import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import firebase from 'react-native-firebase';
import moment from 'moment';
import * as news from '../lib/news';

class News extends Component {
  constructor(props) {
    super(props);

    this.showLoading = this.showLoading.bind(this);

    this.ref = null;

    this.state = {
      loading: true,
      leadLayout: {},
      articles: []
    };
  }

  getNews(category) {
    news.getAll(category)
    .then(response => {
      const { articles } = response;
      this.setState({ articles, loading: false });
    }).catch(e => {
      console.log(e);
    });
  }

  componentWillMount() {
    const { uid } = this.props.user;
    const { setNewsCategory } = this.props;

    this.ref = firebase.database().ref(`news/${uid}`);
    this.ref.on('value', (snap) => {
      const { _value } = snap;

      if(_value) {
        this.getNews(_value);
      } else {
        this.getNews();
      }

      setNewsCategory(_value);
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
    const { newsContainer, leadArticleContainer, leadArticleImage, leadArticleText, leadArticleTitle, leadArticleSubText, newsHeader } = styles;
    const { loading, articles, leadLayout } = this.state;
    const { category } = this.props.news;

    if(loading) {
      return(
        <Text>Loading</Text>
      );
    }

    return (
      <View style={newsContainer}>
        <Text style={newsHeader}>{category ? category.toUpperCase() + ' ' : ''}NEWS</Text>
        <TouchableOpacity style={leadArticleContainer} onPress={() => this.goToArticle(articles[0])} onLayout={e => this.setState({ leadLayout: e.nativeEvent.layout })}>
          <Image source={{ uri: articles[0].urlToImage }} resizeMode={'cover'} style={{ height: leadLayout.width, width: leadLayout.width }} />
          <View style={leadArticleText}>
            <Text style={leadArticleTitle}>{articles[0].title}</Text>
            <Text style={leadArticleSubText}>{articles[0].source.name}</Text>
            <Text style={leadArticleSubText}>{moment(articles[0].publishedAt).format('MMMM Do YYYY @ h:mm a')}</Text>
          </View>
        </TouchableOpacity>
        {this.showArticles()}
      </View>
    );
  }

  showArticles() {
    const { articles } = this.state;

    return articles.map((e, i) => {
      if(i == 0) return;
      return (
        <TouchableOpacity key={e.title} onPress={() => this.goToArticle(e)} style={{ paddingVertical: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: '200' }}>{e.title}</Text>
          <View>
            <Text>{e.source.name}</Text>
            <Text>{moment(e.publishedAt).format('MMMM Do YYYY @ h:mm a')}</Text>
          </View>
        </TouchableOpacity>
      );
    });

    /*
    let result = [];

    for(let x = 1; x < 5; x += 1) {
      const e = articles[x];
      result.push(
        <TouchableOpacity key={e.title} onPress={() => this.goToArticle(e)} style={{ paddingVertical: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: '200' }}>{e.title}</Text>
          <View>
            <Text>{e.source.name}</Text>
            <Text>{moment(e.publishedAt).format('MMMM Do YYYY @ h:mm a')}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return result;
    */
  }

  goToArticle(article) {
    const { navigate } = this.props.navigation;
    navigate('Browser', { url: article.url });
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
    fontSize: 30,
    color: '#eb685b',
    fontWeight: '200'
  },
  leadArticleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  leadArticleText: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 15,
    maxWidth: '90%',
    justifyContent: 'center'
  },
  leadArticleTitle: {
    fontSize: 25,
    fontWeight: '200',
    color: '#FFF',
    textAlign: 'center'
  },
  leadArticleSubText: {
    color: '#FFF',
    fontWeight: '200',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 5
  }
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
