const yaml = require('js-yaml')
const ehto = require('ever-html-to-object')
module.exports = function (raw) {
  const post = ehto(raw, { rmAssetsPrefix: true })
  post.date = post.created
  const body = post.body
  delete post.body
  return ["---", yaml.safeDump(post), "---", body].join('\n')
}
