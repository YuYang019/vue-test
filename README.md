# vue-test-example

本项目使用 @vue/test-utils + jest 进行单元测试。例子包含了一些实际开发中常见的场景。

主要包括：

- axios 测试
- vue-router 测试
- vuex 测试
- eventhub 测试
- emit 测试
- computed 测试
- filter 测试
- watch 测试
- 生命周期测试
- window 全局方法 (以 open/localStorage/定时器 为例)
- 自定义组件测试（测试props, 插槽功能等）

## Tips

- 代码可供参考，但是具体测试方式并不是唯一的，还是要看实际情况和个人喜好
- 本项目把 case 拆的比较细，而实际项目中一般是各种 case 的组合，所以请酌情组合删减

## 参考资料

- [vue-test-utils官方文档](https://vue-test-utils.vuejs.org/zh/)
- [Vue测试指南](https://lmiller1990.github.io/vue-testing-handbook/zh-CN/#%E8%BF%99%E6%9C%AC%E6%8C%87%E5%8D%97%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)
- [jest官方文档](https://jestjs.io/docs/en/getting-started)
