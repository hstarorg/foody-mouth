import { StackNavigator } from 'react-navigation';

import { HomeIndexScreen } from './index/Index';

export const HomeStackNavigator = StackNavigator({
  HomeIndex: { screen: HomeIndexScreen }
}, { headerMode: 'none' });
