const fs = require('hexo-fs')
const util = require('./util')

module.exports = function (args) {
  if (fs.existsSync('./db.json')) {
    fs.unlinkSync('./db.json')
    util.info('Deleted database.')
  }
  if (fs.existsSync('./public')) {
    fs.rmdirSync('./public')
    util.info('Deleted public folder.')
  }
  if (fs.existsSync('./source')) {
    fs.rmdirSync('./source')
    util.info('Deleted source folder.')
  }
}
