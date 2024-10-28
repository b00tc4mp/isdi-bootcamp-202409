function Compo(container) {
    this.children = []
    this.container = container
}

Compo.prototype.add = function (child) {
    this.children.push(child)
    this.container.appendChild(child.container)
}

//Added remove method
Compo.prototype.remove = function () {
    this.container.remove()
}

//Created new Form constructor function
function Form(container) {
    this.children = []
    this.container = container
}

Form.prototype.add = function (child) {
    this.children.push(child)
    this.container.appendChild(child.container)
}

Form.prototype.remove = function () {
    this.container.remove()
}

//Added reset method for forms
Form.prototype.reset = function () {
    this.container.reset()
}