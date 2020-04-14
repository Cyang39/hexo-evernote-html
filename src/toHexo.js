const yaml = require('js-yaml')
const ehto = require('ever-html-to-object')
/**
 * @param {String} raw
 */
module.exports = function (raw) {
  const post = ehto(raw, { rmAssetsPrefix: true })
  post.date = post.created
  delete post.created
  const body = post.body
  delete post.body
  const catRegArr = /\[(.*)\](.*)/.exec(post.title)
  if(catRegArr && catRegArr[0] === post.title) {
    post.title = catRegArr[2].trim()
    post.category = catRegArr[1].trim()
  }
  return ["---", yaml.safeDump(post), "---", body].join('\n')
}
