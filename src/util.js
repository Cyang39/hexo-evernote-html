/**
 * @param {String} str 
 */
function info(str) {
  console.log('\x1b[32mINFO\x1b[0m  %s', str)
  info.generated = function (str) {
    console.log('\x1b[32mINFO\x1b[0m  Generated: \x1b[35m%s\x1b[0m', str)
  }
  info.deleted = function (str) {
    console.log('\x1b[32mINFO\x1b[0m  Deleted: \x1b[35m%s\x1b[0m', str)
  }
}

function findEvernotePath() {
  const fs = require('hexo-fs')
  return fs.existsSync('./evernote/我的笔记') ? './evernote/我的笔记' :
    fs.existsSync('./我的笔记') ? './我的笔记' :
      fs.existsSync('./evernote') ? './evernote' : null
}

module.exports = { info, findEvernotePath }
