import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppNavigator from './App.Navigator';
import { i18n } from './core/services';
import { en, zh } from './i18n';
import { AppReducer } from './reducers';

// I18n.fallbacks = true;
i18n.translations = { 'en-us': en, 'zh-cn': zh };
i18n.locales['en-us'] = 'zh-cn'; // 设置回退，如果en-us中找不到，则去zh-cn中找
i18n.locale = 'en-us'; // 设定当前语言

const store = createStore(AppReducer);

// Hide splash after 2s
setTimeout(() => {
  SplashScreen.hide();
}, 1500);

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
