import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';
import _ from 'lodash';
import { AppLoading } from 'expo';

const SLIDE_DATA = [
  { text: 'Welcome to the JobApp', color: '#03A9F4' },
  { text: 'Set your location, then swipe away', color: '#009688'},
  { text: 'Good luck', color: '#03A9F4'}
];

class WelcomeScreen extends Component {
  state = { token: null };
  
  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      this.setState({ token })
      this.props.navigation.navigate('map');
    } else {
      this.setState({ token: false })
    }
  }
  
  onSlidesComplete = () => {
    this.props.navigation.navigate('auth')
  };
  
  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />
    }
    
    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this.onSlidesComplete}
        
      />
    )
  }
}

export default WelcomeScreen;