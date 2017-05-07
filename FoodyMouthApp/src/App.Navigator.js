import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';

import { HomeStackNavigator } from './modules/home';
import { MeetStackNavigator } from './modules/meet';
import { RestaurantStackNavigator } from './modules/restaurant';
import { ChatStackNavigator } from './modules/chat';
import { UserCenterStackNavigator } from './modules/usercenter';

export const navigators = {
  Home: {
    screen: HomeStackNavigator, headerMode: 'card'
  },
  Meet: {
    screen: MeetStackNavigator, headerMode: 'card'
  },
  Restaurant: {
    screen: RestaurantStackNavigator, headerMode: 'card'
  },
  Chat: {
    screen: ChatStackNavigator, headerMode: 'card'
  },
  UserCenter: {
    screen: UserCenterStackNavigator, headerMode: 'card'
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

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppTabNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);
