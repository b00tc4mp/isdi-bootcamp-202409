// Creamos funcion invocadora de Titulos
function Heading(text, level) {
    Compo.call(this, document.createElement("h" + level))
    this.container.innerText = text

}
// La vinculamos con funcion madre y le damos condicion de creadora
Heading.extends(Compo)