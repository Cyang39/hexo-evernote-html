module.exports = function (name) {
  const last = ['.html', '.resources', '_files']
  if (last.includes(name.split('.page').pop())) return 'page'
  else if (last.includes(name.split('.draft').pop())) return 'draft'
  else return 'post'
}
