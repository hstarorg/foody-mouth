import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class RestaurantIndexScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '美食',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (null),
  };

  render() {
    return (
      <View>
        <Text>Restaurant</Text>
      </View>
    );
  }
}
