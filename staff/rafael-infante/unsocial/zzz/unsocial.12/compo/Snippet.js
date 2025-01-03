/**
 * 
 * @param {*} text 
 */
function Snippet(title, text) {
  Compo.call(this, document.createElement('div'))

  var title = new Heading(title, 4)
  this.add(title)

  var pre = new Preformatted('')
  var code = new Code(text)
  pre.add(code)

  this.add(pre)
}

Snippet.extends(Compo)