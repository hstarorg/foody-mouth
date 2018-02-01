import JPushModule from 'jpush-react-native';
import { Platform } from 'react-native';

function noop() {}

export const jPushHelper = {
  /**
   * 确保返回值是Function，如果fn不是，则返回noop
   * @param {*} fn
   */
  _ensureFn(fn) {
    return typeof fn === 'function' ? fn : noop;
  },
  /**
   * 初始化JPush，Android Only，实际是执行两个操作initPush和notifyJSDidLoad
   */
  async notifyJSDidLoadAndroid(cb) {
    JPushModule.notifyJSDidLoad(this._ensureFn(cb));
  },

  /**
   * 获取Android设备信息
   */
  async getInfoAndroid() {
    return new Promise(resolve => {
      JPushModule.getInfo(info => {
        resolve(info);
      });
    });
  },

  /**
   * 恢复接收通知（Android Only）
   */
  async resumePushAndroid() {
    JPushModule.resumePush();
  },

  /**
   * 获取设备注册到JPush的注册ID，可以通过 registrationId 进行推送
   */
  async getRegistrationID() {
    return new Promise(resolve => {
      JPushModule.getRegistrationID(resolve);
    });
  },

  /**
   * 停止推送
   */
  async stopPush() {
    JPushModule.stopPush();
  },

  /**
   * 设置别名（一般用于同账户多设备）
   * 如果alias='',表示取消别名
   * 别名长度为40（字母（区分大小写）、数字、下划线、汉字），汉字算三个长度
   * @param {string} alias 要设置的别名
   */
  async setAlias(alias) {
    return new Promise((resolve, reject) => {
      JPushModule.setAlias(alias, result => {
        if (result.errorCode) {
          return reject(result);
        }
        resolve(result);
      });
    });
  },

  //region tag相关

  /**
   * 在设备原有的tag基础上，追加新的tags
   * @param {string[]} tags 要追加的tags
   */
  async addTags(tags) {
    return new Promise((resolve, reject) => {
      JPushModule.addTags(tags, result => {
        if (result.errorCode) {
          return reject(result);
        }
        resolve(result);
      });
    });
  },

  /**
   * 删除设备指定的tag列表
   * @param {string[]} tags 要删除的tags
   */
  async deleteTags(tags) {
    return new Promise((resolve, reject) => {
      JPushModule.deleteTags(tags, result => {
        if (result.errorCode) {
          return reject(result);
        }
        resolve(result);
      });
    });
  },

  /**
   * 给设备设置新的tags（会覆盖之前的Tags）
   * @param {string[]} tags 要设置Tag列表
   */
  async setTags(tags) {
    return new Promise((resolve, reject) => {
      JPushModule.setTags(tags, result => {
        if (result.errorCode) {
          return reject(result);
        }
        resolve(result);
      });
    });
  },

  /**
   * 清除设备的所有Tags
   */
  async cleanTags() {
    return new Promise((resolve, reject) => {
      JPushModule.cleanTags(result => {
        if (result.errorCode) {
          return reject(result);
        }
        resolve(result);
      });
    });
  },
  //endregion

  /**
   * 清除所有的通知信息（todo: 到底是不是Android Only？）
   */
  async clearAllNotifications() {
    JPushModule.clearAllNotifications();
  },

  /**
   * 根据NotificationId清除消息
   * @param {number} notificationId
   */
  async clearNotificationById(notificationId) {
    JPushModule.clearNotificationById(notificationId);
  },

  //region 点击推送事件
  /**
   * 注册点击消息事件监听函数
   * 当点击消息时触发事件，和APP是否打开无关
   * @param {Function} cb 要注册的监听函数
   */
  async addReceiveOpenNotificationListener(cb) {
    JPushModule.addReceiveOpenNotificationListener(this._ensureFn(cb));
  },

  /**
   * 移除点击消息事件监听函数
   * @param {Function} cb 要移除的监听函数
   */
  async removeReceiveOpenNotificationListener(cb) {
    JPushModule.removeReceiveOpenNotificationListener(this._ensureFn(cb));
  },
  //endregion

  //region 推送事件
  /**
   * 注册收到消息推送事件的监听函数
   * 在应用开启状态，收到消息时触发
   * @param {Function} cb  要注册的监听函数
   */
  async addReceiveNotificationListener(cb) {
    JPushModule.addReceiveNotificationListener(this._ensureFn(cb));
  },

  /**
   * 移除收到消息推送事件的监听函数
   * @param {Function} cb 要注册的监听函数
   */
  async removeReceiveNotificationListener(cb) {
    JPushModule.removeReceiveNotificationListener(this._ensureFn(cb));
  },
  //endregion

  //region 自定义消息
  /**
   * 注册收到自定义消息事件的监听函数
   * @param {Function} cb 要注册的监听函数
   */
  async addReceiveCustomMsgListener(cb) {
    JPushModule.addReceiveCustomMsgListener(this._ensureFn(cb));
  },

  /**
   * 移除收到自定义消息事件的监听函数
   * @param {Function} cb 要移除的监听函数
   */
  async removeReceiveCustomMsgListener(cb) {
    JPushModule.removeReceiveCustomMsgListener(this._ensureFn(cb));
  },
  //endregion

  //region IOS点击消息启动APP
  /**
   * 注册IOS点击推送事件打开APP的监听函数
   * @param {Function} cb 要添加的监听函数
   */
  async addOpenNotificationLaunchAppListenerIOS(cb) {
    JPushModule.addOpenNotificationLaunchAppListener(this._ensureFn(cb));
  },

  /**
   * 移除IOS点击推送事件监听函数
   * @param {Function} cb 要移除的监听函数
   */
  async removeOpenNotificationLaunchAppEventListenerIOS(cb) {
    JPushModule.removeOpenNotificationLaunchAppEventListener(this._ensureFn(cb));
  }

  //endregion
};
