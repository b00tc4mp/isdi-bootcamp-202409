function Compo(container) {
    this.children = []
    this.container = container
}
// Utilidad para todas las compo (independientemente de tipo form,value,input,et)

Compo.prototype.add = function (child) {
    this.children.push(child)
    this.container.appendChild(child.container)
}

Compo.prototype.remove = function () {
    this.container.remove()
}

Compo.prototype.addBehavior = function (type, callback) {
    this.container.addEventListener(type, callback)
}