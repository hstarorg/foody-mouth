import { StackNavigator } from 'react-navigation';

import { UserCenterIndexScreen } from './index/Index';

export const UserCenterStackNavigator = StackNavigator({
  UserCenterIndex: { screen: UserCenterIndexScreen }
}, { headerMode: 'none' });
