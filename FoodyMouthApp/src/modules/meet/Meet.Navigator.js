import { StackNavigator } from 'react-navigation';

import { MeetIndexScreen } from './index/Index';

export const MeetStackNavigator = StackNavigator({
  MeetIndex: { screen: MeetIndexScreen }
}, { headerMode: 'none' });
