const fs = require('hexo-fs')
const yaml = require('js-yaml')
const ehto = require('ever-html-to-object')

const everpath = fs.existsSync('./evernote/我的笔记') ? './evernote/我的笔记' : fs.existsSync('./我的笔记') ? './我的笔记' : './evernote'
const sourcepath = './source'

function checkType(name) {
  const last = ['.html', '.resources', '_files']
  if (last.includes(name.split('.page').pop())) return 'page'
  else if (last.includes(name.split('.draft').pop())) return 'draft'
  else return 'post'
}

function toHexo(raw) {
  const post = ehto(raw, { rmAssetsPrefix: true })
  post.date = post.created
  const body = post.body
  delete post.body
  return ["---", yaml.safeDump(post), "---", body].join('\n')
}

hexo.extend.console.register('ever', 'Evernote generator.', function (args) {
  const ignoreList = ['index.html', 'Evernote_index.html']

  const everlist = fs.readdirSync(everpath)
    .filter(x => !ignoreList.includes(x))
    .map(i => {
      return {
        name: i,
        path: everpath + '/' + i
      }
    })

  everlist
    .filter(i => /^.*\.html/.test(i.name))
    .forEach(x => {
      const type = checkType(x.name)
      x.name = x.name.split('.html')[0] + '.md'
      x.content = toHexo(fs.readFileSync(x.path))
      if (type === 'post') x.path = sourcepath + '/_posts/' + x.name
      if (type === 'draft') x.path = sourcepath + '/_drafts/' + x.name.split('.draft').join('')
      if (type === 'page') x.path = sourcepath + '/' + x.name.split('.page').join('').split('.md')[0] + '/index.md'
      const _content = x.content.split('---')
      _content[1] = '\n' + 'layout: ' + type + _content[1]
      x.content = _content.join('---')
      fs.writeFileSync(x.path, x.content)
    })

  everlist
    .filter(i => fs.statSync(i.path).isDirectory())
    .forEach(dir => {
      const type = checkType(dir.name)
      const p = type === 'post' ? '/_posts/' : type === 'draft' ? '/_drafts/' : '/'
      let dirname = dir.name.split('.resources').join('')
        .split('_files').join('')
        .split('.page').join('')
        .split('.draft').join('')
      if (type === 'page') dirname += '/index'
      fs.copyDir(dir.path, sourcepath + p + dirname)
    })

  hexo.call('generate').then(function () {
    return hexo.exit();
  }).catch(function (err) {
    return hexo.exit(err);
  });
})

hexo.extend.console.register('clean', 'Remove generated files and cache.', function (args) {
  if (fs.existsSync('./public')) fs.rmdirSync('./public')
  if (fs.existsSync('./db.json')) fs.unlinkSync('./db.json')
  if (fs.existsSync('./source')) fs.rmdirSync('./source')
})
