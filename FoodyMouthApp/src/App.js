import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { AppRegistry } from 'react-native';
import SplashScreen from 'rn-splash-screen';

import { AppNavigator } from './App.Navigator';
import { I18n } from './core/services';
import { AppReducer } from './reducers';

// Hide the active splash screen
SplashScreen.hide();

// I18n.fallbacks = true;
I18n.translations = {
  'en-us': { hello: 'Hello' },
  'zh-cn': { hello: '欢迎' }
};
I18n.locales['en-us'] = 'zh-cn'; // 设置回退，如果en-us中找不到，则去zh-cn中找
I18n.locale = 'en-us'; // 设定当前语言

class FoodyMouthApp extends Component {
  store = createStore(AppReducer);
  render() {
    return (
      <Provider store={this.store}>
        <AppNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('FoodyMouthApp', () => FoodyMouthApp);
