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