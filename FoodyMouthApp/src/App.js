import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppNavigator from './App.Navigator';
import { jPushHelper } from './core/common';
import { i18n } from './core/services';
import { en, zh } from './i18n';
import { AppReducer } from './reducers';

// I18n.fallbacks = true;
i18n.translations = { 'en-us': en, 'zh-cn': zh };
i18n.locales['en-us'] = 'zh-cn'; // 设置回退，如果en-us中找不到，则去zh-cn中找
i18n.locale = 'en-us'; // 设定当前语言

const store = createStore(AppReducer);

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }

  async componentDidMount() {
    // Hide splash after 1.5s
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
    const registrationId = await jPushHelper.getRegistrationID();
    console.log('registrationId=', registrationId);
    await jPushHelper.initJPush();
    jPushHelper.notifyJSDidLoadAndroid(async abc => {
      jPushHelper.addReceiveNotificationListener(msgObj => {
        const { id } = msgObj;
        // jPushHelper.clearNotificationById(id);
        console.log('页面内收到通知-app运行时才能收到消息', msgObj);
      });
      jPushHelper.addReceiveOpenNotificationListener(msgObj => {
        console.log('open消息-点击通知栏消息时触发', msgObj);
      });

      jPushHelper.addOpenNotificationLaunchAppListener(msgObj => {
        console.log('app launch-应用启动消息', msgObj);
      });
      jPushHelper.addReceiveExtrasListener(msgObj => {
        console.log('app launch-应用启动消息222', msgObj);
      });
    });
  }

  async componentWillUnmount() {}
}
