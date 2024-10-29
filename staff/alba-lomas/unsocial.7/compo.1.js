


function Compo(container) {
    this.children = []
    this.container = container
}

Compo.prototype.add = function (child) {
    this.children.push(child)
    this.container.appendChild(child.container)
}

Compo.prototype.remove = function () { // creamosun compo con la funcion remove.
    this.container.remove() // le decimos que remueva lo que hay en el compo.remove.
}





function Form(container) { // creamos la funcion Form, para que haga lo mismo con todos los Forms.
    this.children = []
    this.container = container
}

Form.prototype.add = function (child) {
    this.children.push(child)
    this.container.appendChild(child.container)
}

Form.prototype.remove = function () { // creamos la funcion remove de la funcion Form.
    this.container.remove() // le decimos que remueva lo que hay en el compo.remove.
}

Form.prototype.resert = function () { // creamos la funcion resert de la funcion Form.
    this.container.reset()
}

