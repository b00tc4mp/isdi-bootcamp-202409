


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
    Compo.call(this, container)
}

Form.prototype = Object.create(Compo.prototype)
Form.prototype.constructor = Form

Form.prototype.reset = function () { // creamos la funcion resert de la funcion Form.
    this.container.reset()
}

