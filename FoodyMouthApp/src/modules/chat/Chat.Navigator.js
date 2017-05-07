import { StackNavigator } from 'react-navigation';

import { ChatIndexScreen } from './index/Index';

export const ChatStackNavigator = StackNavigator({
  ChatIndex: { screen: ChatIndexScreen }
}, { headerMode: 'none' });
