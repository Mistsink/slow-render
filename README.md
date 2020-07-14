# slow-render

### 在historyRouter中：

- 不知道怎么手动触发popstate改变，只能靠浏览器手动前进后退
- go方法中手动调用handleHistoryChange方法进行页面渲染
- 为了完成点击a标签而不使页面刷新，不知道怎么去监听这个变化，只好页面初始化时，给a标签绑定事件，阻止跳转行为，并根据a标签的href调用go方法



这糊的。。害，不愧是我这个小垃圾