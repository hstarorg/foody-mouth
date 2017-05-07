import { StackNavigator } from 'react-navigation';

import { RestaurantIndexScreen } from './index/Index';

export const RestaurantStackNavigator = StackNavigator({
  RestaurantIndex: { screen: RestaurantIndexScreen }
}, { headerMode: 'none' });
