将印象笔记导出的 html 直接在 hexo 中使用，暂不支持国际版

## 使用方法
一、创建 hexo 目录

```bash
hexo init blog
cd blog
```

二、安装本插件

```
npm install --save hexo-evernote-html
```

输入`hexo --help`查看，如果有`ever`选项说明安装成功

```
Usage: hexo <command>

Commands:
  clean     Remove generated files and cache.
  config    Get or set configurations.
  deploy    Deploy your website.
  ever      Evernote generator.                 <- 该指令
  ... 
```

三、在 hexo 目录下创建一个 everntoe 文件夹

```
blog
   evernote  <- 创建它
   source
   themes
   ...
```

从印象笔记客户端选择想要导出的笔记导出 html 格式到 evernote 文件夹<br>
PS：mac 端的 html 会被导入到 `evernote/我的笔记/`，不过没有关系

四、修改`_config.yaml`的`post_asset_foler`的值为`true`，<br>
因为笔记的附件（包括图片）将使用相对路径：

```bash
# 默认是 false
post_asset_folder: true 
```

五、构建博客，不要使用 `hexo generate`

```bash
hexo ever
```

<hr>

清理的指令还是 `hexo clean`，扩展了对 `<hexo dir>/source`的清理，<br>
如果你的`./source`本身保存有文章，请先保存到印象笔记中，以免被删除。<br>
<br>
`hexo serve` 不管用，需要重写该指令，也用不到。<br>
<br>
可以通过笔记标题来分`layout`，比如:
  - `foo.page` => layout: page
  - `bar.draft` => layout: draft
  - `baz` => layout: post 默认为 post
