const fs = require('hexo-fs')
const checkType = require('./src/checkType')
const toHexo = require('./src/toHexo')
const util = require('./src/util')

// Overwrite clean command
hexo.extend.console.register('clean', 'Remove generated files and cache.', require('./src/cmdClean'))

// Add ever command
hexo.extend.console.register('ever', 'Evernote generator.', function (args) {

  // find the path of output folder
  const everpath = util.findEvernotePath()
  if (everpath) {
    util.info(`Find Evernote path: \x1b[35m${everpath}\x1b[0m`)
  } else {
    util.info('Can\'t find Evernote path. Please read the doc: https://www.npmjs.com/package/hexo-evernote-html')
    hexo.exit()
  }

  // ignore these files/folders
  const ignoreList = ['index.html', 'Evernote_index.html']
  const everlist = fs.readdirSync(everpath)
    .filter(x => !ignoreList.includes(x))
    .map(i => {
      return { name: i, path: everpath + '/' + i }
    })

  // filter html files to handle
  everlist.filter(i => /^.*\.html/.test(i.name))
    .forEach(x => {
      const type = checkType(x.name)
      x.name = x.name.split('.html')[0] + '.md'
      x.content = toHexo(fs.readFileSync(x.path))
      if (type === 'post') x.path = './source' + '/_posts/' + x.name
      if (type === 'draft') x.path = './source' + '/_drafts/' + x.name.split('.draft').join('')
      if (type === 'page') x.path = './source' + '/' + x.name.split('.page').join('').split('.md')[0] + '/index.md'
      const _content = x.content.split('---')
      _content[1] = '\n' + 'layout: ' + type + _content[1]
      x.content = _content.join('---')
      fs.writeFileSync(x.path, x.content)
      util.info.generated(x.path)
    })

  // filter resources files to handle
  everlist.filter(i => fs.statSync(i.path).isDirectory())
    .forEach(dir => {
      const type = checkType(dir.name)
      const p = type === 'post' ? '/_posts/' : type === 'draft' ? '/_drafts/' : '/'
      let dirname = dir.name.split('.resources').join('')
        .split('_files').join('')
        .split('.page').join('')
        .split('.draft').join('')
      if (type === 'page') dirname += '/index'
      fs.copyDir(dir.path, './source' + p + dirname)
    })

  // use default generate command to generate static pages
  hexo.call('generate').then(function () {
    return hexo.exit();
  }).catch(function (err) {
    return hexo.exit(err);
  })
})
