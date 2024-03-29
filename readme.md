# koishi-plugin-what-to-do

[![npm](https://img.shields.io/npm/v/koishi-plugin-what-to-do?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-what-to-do)

纯自定义的“今天做什么”插件。

类似于“今天吃什么”，但是需要 Bot 维护者自行设置随机事件池。本插件的应用场景为 1~2 个群使用的私域 Bot，可以将随机事件设为群聊相关的梗，以增强 Bot 的趣味性。

如果需要为 Bot 指定对自己的称呼，而不是返回“Koishi 推荐你做……”，请[配置 `nickname`](https://koishi.chat/zh-CN/api/core/app.html#options-nickname)。如果该配置项为一个数组，插件会自动取第一个值。
