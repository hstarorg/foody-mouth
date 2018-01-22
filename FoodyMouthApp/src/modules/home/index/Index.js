import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

export class HomeIndexScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '首页',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => null
  };

  render() {
    return (
      <View>
        <Button onPress={() => this.props.navigation.navigate('Notifications')} title="Go to notifications" />
        <Text>Home</Text>
      </View>
    );
  }
}
