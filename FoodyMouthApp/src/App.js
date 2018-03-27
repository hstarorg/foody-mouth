import React, { Component } from 'react';
import { Dimensions, ListView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppNavigator from './AppNavigator';
import { jPushHelper } from './core/common';
import { i18n } from './core/services';
import { en, zh } from './i18n';
import { AppReducer } from './reducers';

// I18n.fallbacks = true;
i18n.translations = { 'en-us': en, 'zh-cn': zh };
i18n.locales['en-us'] = 'zh-cn'; // 设置回退，如果en-us中找不到，则去zh-cn中找
i18n.locale = 'en-us'; // 设定当前语言

const store = createStore(AppReducer);

class App extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listType: 'FlatList',
      listViewData: Array(20)
        .fill('')
        .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
    };
  }
  render2() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }

  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  deleteRow(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    const newData = [...this.state.listViewData];
    const prevIndex = this.state.listViewData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    this.setState({ listViewData: newData });
  }

  onRowDidOpen = (rowKey, rowMap) => {
    console.log('This row opened', rowKey);
    setTimeout(() => {
      this.closeRow(rowMap, rowKey);
    }, 2000);
  };

  render() {
    return (
      <SwipeListView
        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
        renderRow={data => (
          <TouchableHighlight
            onPress={_ => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#AAA'}>
            <View>
              <Text>I am {data.text} in a SwipeListView</Text>
            </View>
          </TouchableHighlight>
        )}
        renderHiddenRow={(data, secId, rowId, rowMap) => (
          <View style={styles.rowBack}>
            <Text>Left</Text>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={_ => this.closeRow(rowMap, `${secId}${rowId}`)}>
              <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={_ => this.deleteRow(rowMap, `${secId}${rowId}`)}>
              <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-150}
      />
    );
  }

  async componentDidMount() {
    // Hide splash after 1.5s
    // setTim eout(() => {
    SplashScreen.hide();
    // }, 1500);
    this._loadJpush();
  }

  async _loadJpush() {
    const registrationId = await jPushHelper.getRegistrationID();
    console.log('registrationId=', registrationId);
    await jPushHelper.notifyJSDidLoadAndroid(() => {});
    jPushHelper.addReceiveNotificationListener(msgObj => {
      const { id } = msgObj;
      // jPushHelper.clearNotificationById(id);
      console.log('页面内收到通知-app运行时才能收到消息', msgObj);
    });
    jPushHelper.addReceiveOpenNotificationListener(msgObj => {
      console.log('open消息-点击通知栏消息时触发', msgObj);
    });
  }

  componentWillUnmount() {}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: Dimensions.get('window').width / 4
  }
});

export default codePush(App);
