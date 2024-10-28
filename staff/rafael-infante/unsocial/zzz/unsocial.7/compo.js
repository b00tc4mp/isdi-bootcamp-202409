function Compo(container) {
  this.container = container
  this.children = []
}

Compo.prototype.add = function (child) {
  this.children.push(child)
  this.container.appendChild(child.container)
}

Compo.prototype.remove = function () {
  this.container.remove()
}

Compo.prototype.addBehavior = function (action, callback) {
  this.container.addEventListener(action, callback)
}

function Header(className) {
  Compo.call(this, document.createElement('header'))
  this.container.classList.add(className)
}

Header.prototype = Object.create(Compo.prototype)
Header.prototype.constructor = Header

function Heading(text, level) {
  Compo.call(this, document.createElement('h' + level))
  this.container.innerText = text
}

Heading.prototype = Object.create(Compo.prototype)
Heading.prototype.constructor = Heading

function Picture(imageSrc, imageClass) {
  Compo.call(this, document.createElement('img'))
  this.container.src = imageSrc
  this.container.classList.add(imageClass)
}

Picture.prototype = Object.create(Compo.prototype)
Picture.prototype.constructor = Picture

function Form(className) {
  Compo.call(this, document.createElement('form'))
  this.container.classList.add(className)
}

Form.prototype = Object.create(Compo.prototype)
Form.prototype.constructor = Form

Form.prototype.reset = function () {
  this.container.reset()
}

function Label(id, text) {
  Compo.call(this, document.createElement('label'))
  this.container.htmlFor = id
  this.container.innerText = text
}

Label.prototype = Object.create(Compo.prototype)
Label.prototype.constructor = Label

function Input(id, type, placeholder, required) {
  Compo.call(this, document.createElement('input'))
  this.container.id = id
  this.container.type = type
  this.container.placeholder = placeholder
  this.container.required = required
}

Input.prototype = Object.create(Compo.prototype)
Input.prototype.constructor = Input

Input.prototype.getValue = function () {
  return this.container.value
}

Input.prototype.setValue = function (value) {
  this.container.value = value
}
function Button(id, type, text) {
  Compo.call(this, document.createElement('button'))
  this.container.id = id
  this.container.type = type
  this.container.innerText = text
}

Button.prototype = Object.create(Compo.prototype)
Button.prototype.constructor = Button

function Link(text, href) {
  Compo.call(this, document.createElement('a'))
  this.container.innerText = text
  this.container.href = href
}

Link.prototype = Object.create(Compo.prototype)
Link.prototype.constructor = Link