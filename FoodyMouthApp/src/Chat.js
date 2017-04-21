import React from 'react';
import { Text, View } from 'react-native';

export class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with aaaa`,
  });

  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}
