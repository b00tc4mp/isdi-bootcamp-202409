


function Compo(container) {
    this.container = container
    this.children = []
}

Compo.prototype.add = function (child) {
    this.children.push(child)
    this.container.appendChild(child.container)
}