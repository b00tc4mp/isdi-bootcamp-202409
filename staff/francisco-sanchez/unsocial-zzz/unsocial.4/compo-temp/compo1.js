function Compo(name) {
    this.name = name
    this.children = []
}

Compo.prototype.add = function (child) {
    this.children.push(child)
}

var doc = new Compo('doc')

var doctype = new Compo('doctype')
var html = new Compo('html')
doc.add(doctype)
doc.add(html)

var head = new Compo('head')
var body = new Compo('body')
html.add(head)
html.add(body)

var h1 = new Compo('h1')
var title = new Compo('Hello, World!')
h1.add(title)
var p = new Compo('p')
var desc = new Compo('Lorem ipsum ...')
p.add(desc)
body.add(h1)
body.add(p)

console.log(doc)