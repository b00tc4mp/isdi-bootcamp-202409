function Compo(container) {
    this.children = []
    this.container = container
}

Compo.prototype.add = function (child) {
    this.children.push(child)
    this.container.appendChild(child.container)
}

Compo.prototype.remove = function () {
    this.container.remove()
}


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

Form.prototype.reset = function () {
    this.container.reset()
}




