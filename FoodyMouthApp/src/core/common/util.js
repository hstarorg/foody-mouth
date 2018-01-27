import { Platform } from 'react-native';

export const util = {
  get isAndroid() {
    return Platform.OS === 'android';
  },

  get isIOS() {
    return Platform.OS === 'ios';
  }
};
