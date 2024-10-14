//Creamos funcion invocadora de Anchors
function Link(text) {
    Compo.call(this, document.createElement("a"))
    this.container.innerText = text
    this.container.href = ""

}

// La vinculamos con funcion madre y le damos condicion de creadora
Link.extends(Compo)