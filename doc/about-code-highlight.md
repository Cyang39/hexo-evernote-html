# 关于代码高亮

印象笔记的代码块是不指定语言类型的，一些主题可能没法起高亮功能。

推荐使用 highlight.js 这个库，它可以侦测语言类型。

在模板内引入的方法很简单，在 `post.ejs` 添加如下代码（其他模板引擎同样道理）：

```ejs
<%# 判断 post 是否有代码块 %>
<% if(page.content.split('<pre>').length > 1) { %>
  <link rel="stylesheet" href="//cdn.bootcss.com/highlight.js/9.18.1/styles/default.min.css">
  <script src="//cdn.bootcss.com/highlight.js/9.18.1/highlight.min.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>
<% } %>
```

原主题如果有引入高亮脚本的话可能冲突，最好编辑一下。

当然 hightlight.js 也是支持预渲染的，[hexo-util](https://github.com/hexojs/hexo-util#highlightstr-options)里就带有相关接口了，如此的话只要引入 css 文件即可。

在 [highlight.js demo](https://highlightjs.org/static/demo/) 可以查看更多主题。
