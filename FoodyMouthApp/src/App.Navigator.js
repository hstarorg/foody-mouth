import React, { Component } from 'react';
import { Button } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';



class MyHomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '首页',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (null),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}

class MyNotificationsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '搜索',
    tabBarIcon: ({ tintColor }) => (
      null
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const navigators = {
  Meet: {
    screen: MyHomeScreen,
  },
  Food: {
    screen: MyHomeScreen,
  },
  Search: {
    screen: MyNotificationsScreen,
  },
  Restaurant: {
    screen: MyHomeScreen,
  },
  UserCenter: {
    screen: MyHomeScreen
  }
};

const navigatorOpt = {
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
  tabBarPosition: 'bottom'
};

export const AppNavigator = TabNavigator(navigators, navigatorOpt);
