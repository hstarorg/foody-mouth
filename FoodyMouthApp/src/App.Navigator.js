import PropTypes from 'prop-types';
import React from 'react';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import { ChatStackNavigator } from './modules/chat';
import { HomeStackNavigator } from './modules/home';
import { MeetStackNavigator } from './modules/meet';
import { RestaurantStackNavigator } from './modules/restaurant';
import { UserCenterStackNavigator } from './modules/usercenter';

export const navigators = {
  Home: {
    // 首页
    screen: HomeStackNavigator,
    headerMode: 'card'
  },
  Meet: {
    // 饭局
    screen: MeetStackNavigator,
    headerMode: 'card'
  },
  Restaurant: {
    // 发现
    screen: RestaurantStackNavigator,
    headerMode: 'card'
  },
  Chat: {
    // 聊天
    screen: ChatStackNavigator,
    headerMode: 'card'
  },
  UserCenter: {
    // 我的
    screen: UserCenterStackNavigator,
    headerMode: 'card'
  }
};

const navigatorOpt = {
  tabBarOptions: {
    activeTintColor: '#e51c23',
    labelStyle: {
      fontSize: 16,
      color: '#fff'
    },
    style: {
      backgroundColor: '#000'
    }
  },
  tabBarPosition: 'bottom'
};

export const AppTabNavigator = TabNavigator(navigators, navigatorOpt);

const AppWithNavigation = ({ dispatch, nav }) => (
  <AppTabNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    nav: state.nav
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigation);
