import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class ChatIndexScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '聊天',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (null),
  };

  render() {
    return (
      <View>
        <Text>Chat</Text>
      </View>
    );
  }
}
