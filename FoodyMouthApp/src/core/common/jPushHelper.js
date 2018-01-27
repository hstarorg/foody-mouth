import JPushModule from 'jpush-react-native';

import { util } from './util';

export const jPushHelper = {
  /**
   * 初始化JPush（仅Android需要，iOS也可调用）
   */
  async initJPush() {
    if (util.isAndroid) {
      return new Promise(resolve => {
        JPushModule.notifyJSDidLoad(resolve);
      });
    }
    return Promise.resolve();
  },

  /**
   * [Common]获取本设备注册到JPush的ID（设备ID）
   */
  async getRegistrationID() {
    return new Promise(resolve => {
      JPushModule.getRegistrationID(resolve);
    });
  },

  /**
   * [Common]停止推送
   */
  stopPush() {
    JPushModule.stopPush();
  },

  /**
   * [Android] 根据NotificationId清理消息
   * @param {number} notificationId
   */
  clearNotificationById(notificationId) {
    JPushModule.clearNotificationById(notificationId);
  },

  /**
   * 注册接收消息监听器
   * @param {({id, extras, alertContent})=>void} cb 回调函数
   */
  addReceiveNotificationListener(cb) {
    JPushModule.addReceiveNotificationListener(cb);
  },

  /**
   * 注册点击消息监听器
   * @param {({id, extras, alertContent})=>void} cb
   */
  addReceiveOpenNotificationListener(cb) {
    JPushModule.addReceiveOpenNotificationListener(cb);
  },

  /**
   * 注册应用启动消息
   * @param {({id, extras, alertContent})=>void} cb
   */
  addOpenNotificationLaunchAppListener(cb) {
    JPushModule.addOpenNotificationLaunchAppListener(cb);
  },

  addReceiveExtrasListener(cb){
    JPushModule.addReceiveExtrasListener(cb);
  },

  notifyJSDidLoadAndroid(cb) {
    JPushModule.notifyJSDidLoad(cb);
  },

  /**
   * 移除接受通知的事件
   */
  removeReceiveNotificationListener(cb) {
    JPushModule.removeReceiveNotificationListener(cb);
  },

  /**
   * 移除自定义消息事件
   */
  removeReceiveCustomMsgListener(cb) {
    JPushModule.removeReceiveCustomMsgListener(cb);
  }
};
