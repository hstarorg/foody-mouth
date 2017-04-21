# FoodyMouthApp

由 `react-native` 制作得本地APP。

# Functions

# How to Start

由于没有苹果开发环境，所以以下文档，仅对应在Windows上开发Android APP。

> 如果有苹果的环境，执行 `react-native run-ios` 运行。

Windows上的启动命令如下：

```bash
# 运行Android(需要安装Android开发环境-推荐Android-Studio)
react-native run-android
```

执行命令之后，还会创建一个新的控制台，来处理构建任务。然而有时，我们的构建控制台可能会由于代码错误会停止运行，此时，我们需要手动打开控制台，并执行 `react-native start` 即可运行构建控制台。


另，可能会遇到如下一些问题：

1. SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable.

大概就是说没有找到 `Android SDK` 路径。让我们在 `android/` 目录下，创建 `local.properties` 文件，并指定 `sdk.dir`；或者是设置一个环境变量 `ANDROID_HOME`=`Sdk地址`。

好，我们照做就是，我的做法是创建文件并设置 `sdk.dir`，如下：

```
// android/local.properties 文件内容
sdk.dir=D://GreenSoft//Android//sdk
``` 

2. com.android.builder.testing.api.DeviceException: No connected devices!

这个也很明显了，就是说，没有设备可连接。所以，我们需要先启动模拟器。

**如果能在模拟器中看到启动了App，那就妥了。我在使用过程中，就遇到以上两个问题。**

# Other

## 遇到的问题汇总

1、在使用 `react-navigation` 路由时，遇到了 `Unable to resolve module  react/lib/ReactComponentWithPureRenderMixin` 错误。

这是由于当前时间点（2017-04-21）安装的 `react-navigation`版本为：`1.0.0-beta.7`。碰巧这个版本，作者在 `node_modules/react-navigation/src/views/Header.js` 中多写了一行 
```js
import ReactComponentWithPureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
```

我们只需要找到这个文件，删除这一行，即可解决该问题。

2、`react-navigation` 官方文档坑人（居然不是最新的）

**坑2.1、**

官方对于动态设置 `title` 的做法是：

```js
// 错误的用法（虽然是在官方文档中找到的）
static navigationOptions = ({ navigation }) => ({
  title: `Chat with ${navigation.state.params.user}`,
});
```

实际应该为：

```js
// 正确的做法
static navigationOptions = {
  title: ({ state }) => `Chat with ${state.params.user}`
}
```

**坑2.2、**

官方对于设置 `header` 右侧内容的代码是：

```js
static navigationOptions = {
  headerRight: <Button title="Info" />,
  ...
}
```

实际，我就呵呵哒，应该为：

```js
static navigationOptions = {
  header: navigation => {
    return {
      right: <Button title="Info" />
    }
  },
  ...
}
```

**通过查阅：https://github.com/react-community/react-navigation/issues/1060 了解到，并不是官方文档太旧，而是官方文档太超前。为了匹配上官方文档，我们必须采用其他的方式来处理，那就是使用npm安装特定的更新的提交**

**修改 `package.json` 中 `react-navigation` 的版本为： `git+https://github.com/react-community/react-navigation.git#7165efc`，即可安装和文档匹配的版本。**

**注意：修改之后执行 `npm i` 相当慢，要有点耐心。**
