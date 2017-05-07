import { AppRegistry } from 'react-native';
import SplashScreen from 'rn-splash-screen';

import { AppNavigator } from './App.Navigator';
import { I18n } from './core/services';

// Hide the active splash screen
SplashScreen.hide();

// I18n.fallbacks = true;
I18n.translations = {
  'en-us': { hello: 'Hello' },
  'zh-cn': { hello: '欢迎' }
};
I18n.locales['en-us'] = 'zh-cn'; // 设置回退，如果en-us中找不到，则去zh-cn中找
I18n.locale = 'en-us'; // 设定当前语言

AppRegistry.registerComponent('FoodyMouthApp', () => AppNavigator);
