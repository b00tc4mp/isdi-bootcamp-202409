//

function Compo(container) {
    this.children = []
    this.container = container
}

Compo.prototype.add = function (child) {
    this.children.push(child) // Par poder montar nuestro comcepto
    this.container.appendChild(child.container) //Para poder montar el HTML
}