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

此时，可能会遇到如下一些问题：

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
